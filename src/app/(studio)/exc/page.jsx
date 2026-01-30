"use client"

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Download, FileSpreadsheet, Layers, FileText } from 'lucide-react';
import JSZip from 'jszip';

export default function ExcelTransformer() {
  const [file, setFile] = useState(null);
  const [allSheetsData, setAllSheetsData] = useState([]);
  const [processing, setProcessing] = useState(false);

  const getLastDayOfMonth = (sheetName) => {
    // Map for MOIS 1, MOIS 2, etc. format
    const monthDays = [
      '31/01/2025', // MOIS 1
      '28/02/2025', // MOIS 2
      '31/03/2025', // MOIS 3
      '30/04/2025', // MOIS 4
      '31/05/2025', // MOIS 5
      '30/06/2025', // MOIS 6
      '31/07/2025', // MOIS 7
      '31/08/2025', // MOIS 8
      '30/09/2025', // MOIS 9
      '31/10/2025', // MOIS 10
      '30/11/2025', // MOIS 11
      '31/12/2025'  // MOIS 12
    ];

    // Try to extract number from sheet name (e.g., "MOIS 1" -> 1)
    const match = sheetName.match(/(\d+)/);
    if (match) {
      const monthNum = parseInt(match[1]);
      if (monthNum >= 1 && monthNum <= 12) {
        return monthDays[monthNum - 1];
      }
    }

    // Fallback: check for month names in French/English
    const monthMap = {
      'janvier': '31/01/2025', 'january': '31/01/2025',
      'février': '28/02/2025', 'february': '28/02/2025', 'fevrier': '28/02/2025',
      'mars': '31/03/2025', 'march': '31/03/2025',
      'avril': '30/04/2025', 'april': '30/04/2025',
      'mai': '31/05/2025', 'may': '31/05/2025',
      'juin': '30/06/2025', 'june': '30/06/2025',
      'juillet': '31/07/2025', 'july': '31/07/2025',
      'août': '31/08/2025', 'august': '31/08/2025', 'aout': '31/08/2025',
      'septembre': '30/09/2025', 'september': '30/09/2025',
      'octobre': '31/10/2025', 'october': '31/10/2025',
      'novembre': '30/11/2025', 'november': '30/11/2025',
      'décembre': '31/12/2025', 'december': '31/12/2025', 'decembre': '31/12/2025'
    };

    const lowerSheet = sheetName.toLowerCase().trim();
    for (const [monthName, date] of Object.entries(monthMap)) {
      if (lowerSheet.includes(monthName)) {
        return date;
      }
    }

    return '31/12/2025'; // Default fallback
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setProcessing(true);

    try {
      const data = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      
      const processedSheets = [];
      
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const autoDate = getLastDayOfMonth(sheetName);
        const transformed = transformData(jsonData, autoDate);
        
        processedSheets.push({
          name: sheetName,
          originalData: jsonData,
          transformedData: transformed,
          date: autoDate,
          invoiceCount: (transformed.length - 1) / 3
        });
      }
      
      setAllSheetsData(processedSheets);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please make sure it\'s a valid Excel file.');
    } finally {
      setProcessing(false);
    }
  };

  const transformData = (data, dateToUse) => {
    if (data.length === 0) return [];

    let startRow = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].length > 0 && data[i][0] && typeof data[i][0] === 'string') {
        if (data[i][0].toLowerCase().includes('client') || data[i][0].toLowerCase().includes('référence')) {
          startRow = i + 1;
          break;
        }
      }
    }

    const transformed = [];
    
    transformed.push([
      'Date',
      'N°',
      'Compte',
      'Libelle',
      'TTC',
      'HT',
      'TVA',
      'VET'
    ]);
    
    let invoiceCounter = 1;

    for (let i = startRow; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length < 8) continue;
      if (row.every(cell => cell === '' || cell === null)) continue;

      const client = String(row[0] || '').trim();
      const factureNum = String(row[1] || '').trim();
      const montantTTC = parseFloat(String(row[2] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
      const montantHT = parseFloat(String(row[3] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
      const montantTVA = parseFloat(String(row[5] || '0').replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

      if (montantTTC === 0 && montantHT === 0 && montantTVA === 0) continue;

      const accountNumbers = ['34210000', '71211000', '44552000'];
      
      // Ensure libellé has no leading/trailing spaces and client+factureNum are properly concatenated
      const libelle = `${client} ${factureNum}`.trim();

      // Row 1: Account 34210000 - TTC amount goes here
      transformed.push([
        dateToUse,                              // Date
        invoiceCounter,                         // N°
        accountNumbers[0],                      // Compte (34210000)
        libelle,                                // Libellé (IRIS 64)
        Math.round(montantTTC).toString(),      // TTC
        '00',                                   // HT
        'VET'                                   // VET
      ]);

      // Row 2: Account 71211000 - HT amount goes here
      transformed.push([
        dateToUse,                              // Date
        invoiceCounter,                         // N°
        accountNumbers[1],                      // Compte (71211000)
        libelle,                                // Libellé (IRIS 64)
        '00',                                   // TTC
        Math.round(montantHT).toString(),       // HT
        'VET'                                   // VET
      ]);

      // Row 3: Account 44552000 - TVA amount goes here
      transformed.push([
        dateToUse,                              // Date
        invoiceCounter,                         // N°
        accountNumbers[2],                      // Compte (71211000)
        libelle,                                // Libellé (IRIS 64)
        '00',                                   // TTC
        Math.round(montantTVA).toString(),       // HT
        'VET'                                   // VET
      ]);
      
      invoiceCounter++;
    }

    return transformed;
  };

  const downloadAllAsZip = async () => {
    if (allSheetsData.length === 0) return;

    const zip = new JSZip();

    for (const sheet of allSheetsData) {
      const txtContent = sheet.transformedData.slice(1).map(row => {
        return row.map(cell => cell || '').join(';');
      }).join('\n');

      const sanitizedName = sheet.name.replace(/[^a-z0-9]/gi, '_');
      zip.file(`${sanitizedName}_sage100.txt`, txtContent);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = file ? file.name.replace(/\.(xlsx|xls)/, '_all_months.zip') : 'all_months_sage100.zip';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadCombinedTxt = () => {
    if (allSheetsData.length === 0) return;

    let combinedContent = '';

    for (const sheet of allSheetsData) {
      const txtContent = sheet.transformedData.slice(1).map(row => {
        return row.map(cell => cell || '').join(';');
      }).join('\n');
      
      combinedContent += txtContent + '\n';
    }

    const blob = new Blob([combinedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = file ? file.name.replace(/\.(xlsx|xls)/, '_combined_sage100.txt') : 'combined_sage100.txt';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllAsExcel = () => {
    if (allSheetsData.length === 0) return;

    const workbook = XLSX.utils.book_new();

    for (const sheet of allSheetsData) {
      const worksheet = XLSX.utils.aoa_to_sheet(sheet.transformedData);
      const sanitizedName = sheet.name.substring(0, 31);
      XLSX.utils.book_append_sheet(workbook, worksheet, sanitizedName);
    }

    const fileName = file ? file.name.replace(/\.(xlsx|xls)/, '_transformed.xlsx') : 'transformed_data.xlsx';
    XLSX.writeFile(workbook, fileName);
  };

  const totalInvoices = allSheetsData.reduce((sum, sheet) => sum + sheet.invoiceCount, 0);
  const totalRows = allSheetsData.reduce((sum, sheet) => sum + (sheet.transformedData.length - 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileSpreadsheet className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Multi-Sheet Invoice Transformer</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Upload an Excel file with multiple sheets named "MOIS 1", "MOIS 2", etc. Each sheet will be automatically processed with the last day of that month in 2025.
          </p>

          {/* File Upload Section */}
          <div className="space-y-6">
            <div className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-lg p-8 text-center transition-colors">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {file ? file.name : 'Click to upload Excel file'}
                </p>
                <p className="text-sm text-gray-500">
                  Supports .xlsx and .xls files with multiple sheets
                </p>
              </label>
            </div>

            {processing && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                <div className="mt-2 text-gray-600">Processing all sheets...</div>
              </div>
            )}

            {/* Results */}
            {allSheetsData.length > 0 && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Transformation Complete!</h3>
                  <div className="text-green-700 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Sheets processed: {allSheetsData.length}</span>
                    </div>
                    <div>Total invoices: {totalInvoices}</div>
                    <div>Total transformed rows: {totalRows}</div>
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={downloadAllAsExcel}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download as Excel
                  </button>
                  
                  <button
                    onClick={downloadAllAsZip}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download as ZIP
                  </button>

                  <button
                    onClick={downloadCombinedTxt}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    Download Combined TXT
                  </button>
                </div>

                {/* Sheets Summary */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">Processed Sheets Summary</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Sheet Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Auto Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Invoices</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase">Rows</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {allSheetsData.map((sheet, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">{sheet.name}</td>
                            <td className="px-4 py-2 text-sm text-blue-600 font-semibold">{sheet.date}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{sheet.invoiceCount}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{sheet.transformedData.length - 1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Preview First Sheet */}
                {allSheetsData.length > 0 && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-700">Preview: {allSheetsData[0].name}</h3>
                    </div>
                    <div className="overflow-x-auto max-h-96">
                      <table className="min-w-full divide-y divide-gray-200 text-xs">
                        <thead className="bg-gray-100">
                          <tr>
                            {allSheetsData[0].transformedData[0]?.map((header, index) => (
                              <th 
                                key={index} 
                                className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {allSheetsData[0].transformedData.slice(1, 13).map((row, i) => (
                            <tr key={i} className={i % 3 === 0 ? 'bg-blue-50' : i % 3 === 1 ? 'bg-green-50' : 'bg-yellow-50'}>
                              {row.map((cell, j) => (
                                <td 
                                  key={j} 
                                  className={`px-3 py-2 text-sm whitespace-nowrap ${
                                    j === 0 ? 'font-medium text-blue-600' : 
                                    j === 1 ? 'font-bold text-orange-600' :
                                    j === 2 ? 'font-medium text-purple-600' :
                                    j === 3 ? 'font-medium text-gray-900' :
                                    (j === 4 || j === 5 || j === 6) ? 'font-bold text-green-600' :
                                    j === 7 ? 'font-medium text-red-600' :
                                    'text-gray-700'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Example Output */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">How it works:</h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>✓ Sheet "MOIS 1" → 31/01/2025 (January)</p>
                    <p>✓ Sheet "MOIS 2" → 28/02/2025 (February)</p>
                    <p>✓ Sheet "MOIS 3" → 31/03/2025 (March)</p>
                    <p>✓ Each invoice generates 3 rows with format: Date;N°;Compte;Libellé;TTC;HT;TVA;VET</p>
                    <p className="font-semibold text-indigo-600">✓ Example output for IRIS invoice 64:</p>
                    <p className="font-mono text-xs bg-white p-2 rounded">31/03/2025;1;34210000;IRIS 64;1128;00;00;VET</p>
                    <p className="font-mono text-xs bg-white p-2 rounded">31/03/2025;1;71211000;IRIS 64;00;940;00;VET</p>
                    <p className="font-mono text-xs bg-white p-2 rounded">31/03/2025;1;44552000;IRIS 64;00;00;188;VET</p>
                    <p>✓ Download as ZIP to get separate .txt files for each month</p>
                    <p>✓ Download Combined TXT to get all months in one file</p>
                    <p>✓ Download as Excel to get all sheets in one workbook</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}