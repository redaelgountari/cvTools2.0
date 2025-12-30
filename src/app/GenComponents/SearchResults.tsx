"use client";

import { useState, useEffect, FormEvent, useContext } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Filter, Search, MapPin, Briefcase, 
  BookOpen, ExternalLink, Watch, 
  TimerIcon, ChevronLeft, ChevronRight, 
  X, CheckCircle, AlertCircle
} from "lucide-react";
import axios from "axios";
import { ReadContext } from "./ReadContext";
import { getFromStorage } from "@/Cookiesmv";

// Types remain the same as in previous version
interface JobResult {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    metatags?: Array<{[key: string]: string}>;
    jobposting?: any;
  };
  formattedUrl?: string;
}

interface SearchFilters {
  experience: string;
  location: string;
  jobType: string;
  publicationDate?: string;
}

interface SearchInformation {
  totalResults?: string;
  formattedTotalResults?: string;
  searchTime?: number;
  formattedSearchTime?: string;
}

interface Pagination {
  currentPage: number;
  resultsPerPage: number;
  totalResults: number;
  totalPages: number;
}


const RechercheOffres = () => {
  const [results, setResults] = useState<JobResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { AnlysedCV } = useContext(ReadContext);
  const storedData = getFromStorage('userData');
  
  const [filters, setFilters] = useState<SearchFilters>({
    experience: "",
    location: "",
    jobType: "",
    publicationDate: ""
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchInfo, setSearchInfo] = useState<SearchInformation>({});
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    resultsPerPage: 10,
    totalResults: 0,
    totalPages: 0
  });
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const loadResumeData = () => {
      try {
        if (AnlysedCV) {
          console.log("Loading data from context:", AnlysedCV);
          setResumeData(AnlysedCV);
          setQuery(AnlysedCV.jobSearchTitle);

        } else if (storedData) { // Use already declared storedData
          console.log("Loading data from storage:", storedData);
          setQuery(storedData.jobSearchTitle);
          setResumeData(storedData);

        }
      } catch (error) {
        console.error("Error loading resume data:", error);
        setError("Failed to load resume data. Please try again.");
      }
    };
    loadResumeData();
  }, [AnlysedCV]);

  useEffect(() => {
    handleSearch();
  }, [resumeData]);

  const handleSearch = async (e?: FormEvent, page = 1) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!query.trim()) {
      setError("Veuillez saisir un terme de recherche");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/googleSearch", {
        query: query.trim(),
        filters: filters,
        page: page,
      });

      setResults(data.results || []);
      setSearchInfo(data.searchInformation || {});
      setPagination(
        data.pagination || {
          currentPage: page,
          resultsPerPage: 10,
          totalResults: 0,
          totalPages: 0,
        }
      );

      // Scroll to top of results
      window.scrollTo({
        top: document.getElementById("results-section")?.offsetTop,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Erreur de recherche :", err);
      setError(err.response?.data?.error || "Impossible de récupérer les résultats. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    handleSearch(undefined, newPage);
  };

  const cleanUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return `${parsed.hostname.replace('www.', '')}${parsed.pathname !== '/' ? parsed.pathname : ''}`;
    } catch {
      return url;
    }
  };

  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      experience: "",
      location: "",
      jobType: "",
      publicationDate: ""
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Recherche Avancée d'Emplois</h2>
                <p className="text-blue-100">Filtrez et trouvez l'emploi qui vous correspond</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className="bg-white/20 text-white hover:bg-white/30 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-5 w-5" />
                  {showFilters ? "Masquer Filtres" : "Afficher Filtres"}
                </Button>
                {Object.values(filters).some(Boolean) && (
                  <Button 
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={resetFilters}
                  >
                    <X className="mr-2 h-5 w-5" />
                    Réinitialiser
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex space-x-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Recherchez des emplois, mots-clés ou entreprises"
                  className="pl-10 py-3 text-base border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onFocus={() => {
                    resumeData?.jobSearchSuggestions?.map((i) => i)
                  }}
                />
              </div>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 transition-colors"
                disabled={loading}
              >
                {loading ? "Recherche en cours..." : "Rechercher"}
              </Button>
            </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-lg">
                  {[
                    {
                      icon: <Briefcase className="mr-2 h-5 w-5 text-blue-600" />,
                      label: "Niveau d'Expérience",
                      field: "experience",
                      options: [
                        { value: "", label: "Tous Niveaux" },
                        { value: "entry", label: "Débutant" },
                        { value: "mid", label: "Intermédiaire" },
                        { value: "senior", label: "Confirmé" },
                        { value: "internship", label: "Stage" }
                      ]
                    },
                    {
                      icon: <MapPin className="mr-2 h-5 w-5 text-green-600" />,
                      label: "Localisation",
                      field: "location",
                      component: (
                        <Input 
                          type="text"
                          value={filters.location ?? resumeData?.personalInfo?.city}
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          placeholder="Ville ou Télétravail"
                          className="w-full"
                        />
                      )
                    },
                    {
                      icon: <BookOpen className="mr-2 h-5 w-5 text-purple-600" />,
                      label: "Type de Contrat",
                      field: "jobType",
                      options: [
                        { value: "", label: "Tous Types" },
                        { value: "full-time", label: "Temps Plein" },
                        { value: "part-time", label: "Temps Partiel" },
                        { value: "contract", label: "Contrat" },
                        { value: "remote", label: "Télétravail" }
                      ]
                    },
                    {
                      icon: <TimerIcon className="mr-2 h-5 w-5 text-red-600" />,
                      label: "Date de Publication",
                      field: "publicationDate",
                      options: [
                        { value: "", label: "Toutes les dates" },
                        { value: "24h", label: "24 dernières heures" },
                        { value: "3d", label: "3 derniers jours" },
                        { value: "7d", label: "Dernière semaine" },
                        { value: "30d", label: "Dernier mois" }
                      ]
                    }
                  ].map((filterGroup) => (
                    <div key={filterGroup.label} className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        {filterGroup.icon}
                        {filterGroup.label}
                      </label>
                      {filterGroup.component || (
                        <select 
                          value={filters[filterGroup.field as keyof SearchFilters]}
                          onChange={(e) => handleFilterChange(filterGroup.field as keyof SearchFilters, e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        >
                          {filterGroup.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </form>

            <div id="results-section">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-md animate-pulse">
                      <div className="space-y-3">
                        <Skeleton className="h-6 w-3/4 bg-gray-200" />
                        <Skeleton className="h-4 w-1/2 bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-6">
                  <AlertCircle className="h-10 w-10 text-red-500 mr-4" />
                  <div>
                    <p className="text-red-600 font-semibold mb-2">{error}</p>
                    <Button 
                      variant="outline"
                      className="text-red-700 hover:bg-red-100"
                      onClick={() => handleSearch()}
                    >
                      Réessayer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.length === 0 ? (
                    <div className="text-center bg-blue-50 p-8 rounded-lg">
                      <CheckCircle className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                      <p className="text-blue-800 font-semibold mb-4">
                        Aucune offre correspondante trouvée
                      </p>
                      <p className="text-blue-600 mb-6">
                        Essayez différents mots-clés ou ajustez vos filtres de recherche.
                      </p>
                      <Button 
                        variant="outline"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                        onClick={() => setShowFilters(true)}
                      >
                        Modifier les Filtres
                      </Button>
                    </div>
                  ) : (
                    <>
                      {searchInfo.formattedTotalResults && (
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span>
                            {searchInfo.formattedTotalResults} résultats 
                            ({searchInfo.formattedSearchTime} secondes)
                          </span>
                          <span className="text-gray-400">
                            Page {pagination.currentPage} / {pagination.totalPages}
                          </span>
                        </div>
                      )}

                      {results.map((result) => (
                        <div 
                          key={result.link}
                          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border-l-4 border-blue-500"
                        >
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-bold text-blue-800 hover:text-blue-600 transition-colors">
                                {result.title}
                              </h3>
                              <ExternalLink className="text-gray-400 hover:text-blue-500" />
                            </div>
                            <p className="text-sm text-green-700 mb-2">
                              {cleanUrl(result.link)}
                            </p>
                            <p className="text-gray-600 line-clamp-2 mb-3">
                              {result.snippet}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {result.pagemap?.jobposting && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                  Offre Vérifiée
                                </span>
                              )}
                            </div>
                          </a>
                        </div>
                      ))}

                      {/* Pagination */}
                      <div className="flex justify-center items-center mt-6 space-x-4">
                        <Button 
                          variant="outline"
                          onClick={() => handlePageChange(pagination.currentPage - 1)}
                          disabled={pagination.currentPage === 1}
                          className="flex items-center px-4 py-2 rounded-full"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Précédent
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <Button
                                key={pageNumber}
                                variant={pagination.currentPage === pageNumber ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(pageNumber)}
                                className={`w-8 h-8 p-0 ${
                                  pagination.currentPage === pageNumber 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-white text-gray-700"
                                }`}
                              >
                                {pageNumber}
                              </Button>
                            );
                          })}
                        </div>
                        
                        <Button 
                          variant="outline"
                          onClick={() => handlePageChange(pagination.currentPage + 1)}
                          disabled={pagination.currentPage === pagination.totalPages}
                          className="flex items-center px-4 py-2 rounded-full"
                        >
                          Suivant
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-100 p-4 text-center text-sm text-gray-500">
            <p>
              Propulsé par l'API de Recherche Google • 
              {searchInfo.formattedTotalResults ? ` ${searchInfo.formattedTotalResults} résultats` : " Aucun résultat"}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RechercheOffres;