"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, ExternalLink, Loader2, AlertCircle, X } from 'lucide-react';
import { useIsCVAnalyzed } from '@/hooks/useIsCVAnalyzed';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Skeleton Card Component
function TemplateCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

// Template Card with Lazy Loading Image
function TemplateCard({ template }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {imageLoading && !imageError && (
          <Skeleton className="absolute inset-0" />
        )}
        <img
          src={template.image}
          alt={template.name}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            setImageLoading(false);
            setImageError(true);
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
            {template.type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">
          {template.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {template.description}
        </CardDescription>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button
          className="w-full group-hover:shadow-md transition-shadow"
          asChild
        >
          <a href={`/portfolio/${template.link}`}>
            View Template
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function TemplatesGallery() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const { isCVAnalyzed, isLoading: isCVLoading } = useIsCVAnalyzed();
  const router = useRouter();

  useEffect(() => {
    if (!isCVLoading && !isCVAnalyzed) {
      router.push('/ReadCV');
    }
  }, [isCVLoading, isCVAnalyzed, router]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [searchQuery, selectedType, templates]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/Templates');
      if (!response.ok) throw new Error('Failed to fetch templates');
      const result = await response.json();
      setTemplates(result.data || []);
      setFilteredTemplates(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(template => template.type === selectedType);
    }

    setFilteredTemplates(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
  };

  const uniqueTypes = ['all', ...new Set(templates.map(t => t.type))];

  if (loading || isCVLoading || (!isCVAnalyzed && !isCVLoading)) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-full md:w-[240px]" />
            </div>
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <TemplateCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">
            <p className="font-semibold mb-2">Error Loading Templates</p>
            <p className="text-sm mb-4">{error}</p>
            <Button onClick={fetchTemplates} variant="outline" size="sm">
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Template Gallery
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our collection of premium developer portfolio templates
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search templates by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[240px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Templates' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(searchQuery || selectedType !== 'all') && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full md:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTemplates.length} of {templates.length} templates
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template._id} template={template} />
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Templates Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedType !== 'all'
                ? 'Try adjusting your filters'
                : 'Check back later for new templates'}
            </p>
            {(searchQuery || selectedType !== 'all') && (
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}