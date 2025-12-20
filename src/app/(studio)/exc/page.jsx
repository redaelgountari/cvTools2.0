"use client"

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';

export default function ExcelTransformer() {
  const [file, setFile] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setProcessing(true);

    try {
      const data = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setOriginalData(jsonData);
      const transformed = transformData(jsonData);
      setTransformedData(transformed);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please make sure it\'s a valid Excel file.');
    } finally {
      setProcessing(false);
    }
  };
  const parseDate = (dateValue) => {
  if (!dateValue) return '01/01/2025';

  // If it's already a formatted date string like "01/03/2025"
  if (typeof dateValue === 'string' && dateValue.includes('/')) {
    return dateValue;
  }

  // If it's an Excel date number, convert it
  if (typeof dateValue === 'number') {
    const date = new Date((dateValue - 25569) * 86400 * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // If it's in format like "01-mars"
  const monthMap = {
    janv: '01', janvier: '01',
    févr: '02', février: '02', fev: '02', fevr: '02',
    mars: '03',
    avr: '04', avril: '04',
    mai: '05',
    juin: '06',
    juil: '07', juillet: '07',
    août: '08', aout: '08',
    sept: '09', septembre: '09',
    oct: '10', octobre: '10',
    nov: '11', novembre: '11',
    déc: '12', décembre: '12', dec: '12'
  };

  const dateString = String(dateValue).toLowerCase().trim();
  const parts = dateString.split('-');

  if (parts.length === 2) {
    const day = String(parts[0]).padStart(2, '0');
    const monthStr = parts[1].trim();

    const month = monthMap[monthStr];
    if (month) {
      return `${day}/${month}/2025`;
    }
  }

  // Fallback
  return '01/01/2025';
};

  const transformData = (data) => {
    if (data.length === 0) return [];

    const headers = ['Date', 'Numéro', 'Col3', 'Col4', 'Compte', 'Col6', 'Libellé', 'Col8', 'Col9', 'Débit', 'Crédit', 'Banque'];
    const transformed = [headers];
    
    let lineNumber = 1;

    data.forEach((row, index) => {
      // Skip header row
      if (index === 0) return;
      
      // Skip empty rows
      if (!row || row.length === 0) return;

      // Parse the date from the first column (Date Opération)
      const dateFromFile = parseDate(row[0]);

      // Get description from column 3 (Libellé opération) - index 2
      const description = row[2] || '';
      
      // Get amount from Débit (column 4 - index 3) or Crédit (column 5 - index 4)
      const debit = row[3];
      const credit = row[4];
      const amount = debit || credit || '';

      // First line with 34970000 (Débit)
      transformed.push([
        dateFromFile,
        lineNumber,
       
        '34970000',
        
        description,
       
        amount,
        "",
       
        'SGMBT'
      ]);

      // Second line with 51410000 (Crédit) - same line number
      transformed.push([
        dateFromFile,
        lineNumber,
       
        '51410000',
       
        description,
        "",
        amount,
        'SGMBT'
      ]);
      
      lineNumber++;
    });

    return transformed;
  };

  const downloadTransformed = () => {
    if (transformedData.length === 0) return;

    const worksheet = XLSX.utils.aoa_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DDOC50_1');

    const fileName = file ? file.name.replace(/\.(xlsx|xls)/, '_DDOC50_1.xlsx') : 'transformed_DDOC50_1.xlsx';
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileSpreadsheet className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Excel to DDOC50 1 Transformer</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Transform your Excel file to DDOC50 1 format. Each row will be duplicated with account numbers 34970000 (Débit) and 51410000 (Crédit). Dates are automatically extracted from your file.
          </p>

          <div className="space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
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
                  Supports .xlsx and .xls files
                </p>
              </label>
            </div>

            {processing && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Processing file...</p>
              </div>
            )}

            {/* Results */}
            {transformedData.length > 0 && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Transformation Complete!</h3>
                  <p className="text-green-700 text-sm">
                    Original rows: {originalData.length - 1} → Transformed rows: {transformedData.length - 1}
                  </p>
                </div>

                <button
                  onClick={downloadTransformed}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Transformed File
                </button>

                {/* Preview */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">Preview (first 20 rows)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-xs">
                      <thead className="bg-gray-100">
                        <tr>
                          {transformedData[0]?.map((header, i) => (
                            <th key={i} className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase whitespace-nowrap">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transformedData.slice(1, 21).map((row, i) => (
                          <tr key={i} className={row[4] === '34970000' ? 'bg-blue-50' : 'bg-green-50'}>
                            {row.map((cell, j) => (
                              <td key={j} className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
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