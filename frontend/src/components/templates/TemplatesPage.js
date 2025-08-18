import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TemplatesPage = ({ onTemplateSelect }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Simulate loading templates when component mounts
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Template categories
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" },
    { id: "simple", name: "Simple" },
    { id: "premium", name: "Premium" },
  ];

  // Enhanced templates with more details
  const templates = [
    {
      id: 1,
      name: "Modern Teal",
      description: "Clean, professional invoice with diagonal corners and teal accents.",
      features: ["Diagonal corners", "Teal accents", "Modern typography"],
      category: "professional",
      isPremium: true,
      colorIndicator: "#20B2AA",
      previewDescription: "Professional invoice with diagonal teal corners and clean layout"
    },
    {
      id: 2,
      name: "Classic Black & White",
      description: "Traditional black and white design suitable for all industries.",
      features: ["Formal layout", "High contrast", "Print-friendly"],
      category: "simple",
      isPremium: false,
      colorIndicator: "#333333",
      previewDescription: "Elegant black and white invoice with traditional formatting"
    },
    {
      id: 3,
      name: "Minimalist Elegance",
      description: "Clean, minimal design with elegant typography for a sophisticated look.",
      features: ["Minimal design", "Elegant typography", "Subtle details"],
      category: "professional",
      isPremium: false,
      colorIndicator: "#E0E0E0",
      previewDescription: "Minimalist invoice with elegant typography and clean spacing"
    },
    {
      id: 4,
      name: "Fresh Green",
      description: "Vibrant green template with logo placeholder for eco-friendly businesses.",
      features: ["Logo placeholder", "Green accents", "Eco-friendly"],
      category: "creative",
      isPremium: false,
      colorIndicator: "#4CAF50",
      previewDescription: "Fresh green invoice with prominent logo area and vibrant accents"
    },
    {
      id: 5,
      name: "Bold Red",
      description: "Eye-catching red template with modern layout for standout invoices.",
      features: ["Bold colors", "Modern grid", "Attention-grabbing"],
      category: "creative",
      isPremium: true,
      colorIndicator: "#D32F2F",
      previewDescription: "Bold red invoice with modern layout and striking typography"
    },
    {
      id: 6,
      name: "Corporate Blue",
      description: "Professional blue template ideal for corporate and business services.",
      features: ["Corporate style", "Structured layout", "Professional tone"],
      category: "professional",
      isPremium: true,
      colorIndicator: "#1976D2",
      previewDescription: "Corporate blue invoice with structured sections and professional appearance"
    },
    {
      id: 7,
      name: "Creative Purple",
      description: "Artistic purple design for creative professionals and agencies.",
      features: ["Artistic elements", "Creative layout", "Unique style"],
      category: "creative",
      isPremium: true,
      colorIndicator: "#9C27B0",
      previewDescription: "Creative purple invoice with artistic elements for standout billing"
    },
    {
      id: 8,
      name: "Simple Invoice",
      description: "No-frills, straightforward invoice template for quick billing.",
      features: ["Straightforward", "Easy to read", "Quick to fill"],
      category: "simple",
      isPremium: false,
      colorIndicator: "#78909C",
      previewDescription: "Simple, no-frills invoice focused on clarity and ease of use"
    },
  ];

  // Filter templates by category
  const filteredTemplates = activeCategory === "all" 
    ? templates 
    : templates.filter(template => 
        activeCategory === "premium" 
          ? template.isPremium 
          : template.category === activeCategory
      );

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Scroll to the selected template info section
    setTimeout(() => {
      document.getElementById('selected-template-info')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  // Handle using the selected template
  const handleUseTemplate = () => {
    if (selectedTemplate && onTemplateSelect) {
      onTemplateSelect(selectedTemplate);
    }
    navigate("/create");
  };

  // Count templates in each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return templates.length;
    if (categoryId === "premium") return templates.filter(t => t.isPremium).length;
    return templates.filter(t => t.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 text-center mb-6">
          Choose Your Invoice Template
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Pick from our professionally designed templates or customize your own.
          Start with a template and make it yours with fonts, colors, and styles.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-gray-200 dark:bg-gray-700 p-1">
            <Button
              className={`px-6 py-2 rounded-lg ${
                activeTab === "browse"
                  ? "bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("browse")}
            >
              Browse Templates
            </Button>
            <Button
              className={`px-6 py-2 rounded-lg ${
                activeTab === "customize"
                  ? "bg-white dark:bg-gray-800 shadow text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("customize")}
            >
              Customize Fonts
            </Button>
          </div>
        </div>

        {/* Browse Templates Tab */}
        {activeTab === "browse" && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`rounded-full px-4 py-2 ${
                    activeCategory === category.id 
                      ? "bg-blue-600 dark:bg-blue-700" 
                      : "dark:border-gray-600 dark:text-gray-300"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name} ({getCategoryCount(category.id)})
                </Button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`overflow-hidden transition-all dark:bg-gray-800 dark:border-gray-700 ${
                      selectedTemplate?.id === template.id
                        ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-xl"
                        : "hover:shadow-md"
                    }`}
                  >
                    {/* Template Preview */}
                    <div 
                      className="h-48 relative" 
                      style={{
                        background: `linear-gradient(45deg, ${template.colorIndicator}22, ${template.colorIndicator}44)`,
                        borderBottom: `3px solid ${template.colorIndicator}`
                      }}
                    >
                      {/* Visual mockup of invoice */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md w-full h-32 p-3 flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div className="w-10 h-10 rounded-md" style={{ backgroundColor: template.colorIndicator }}></div>
                            <div className="text-xs font-bold dark:text-white">INVOICE</div>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="h-1 w-3/4 bg-gray-200 dark:bg-gray-500 mb-1"></div>
                            <div className="h-1 w-1/2 bg-gray-200 dark:bg-gray-500"></div>
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="h-2 w-16 bg-gray-200 dark:bg-gray-500"></div>
                            <div className="h-4 w-12" style={{ backgroundColor: template.colorIndicator + '66' }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Premium badge */}
                      {template.isPremium && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 dark:bg-yellow-600 text-white">
                          Premium
                        </Badge>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: template.colorIndicator }}
                        ></div>
                        <h3 className="font-bold dark:text-white">{template.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.description}</p>
                      
                      {/* Features */}
                      <div className="mb-4">
                        {template.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-700 dark:text-gray-300 mb-1">
                            <svg className="w-3 h-3 text-green-500 dark:text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Select button */}
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        {selectedTemplate?.id === template.id ? "Selected" : "Select Template"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Customize Tab (placeholder for now) */}
        {activeTab === "customize" && (
          <Card className="p-8 mb-12 text-center dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Customize Your Template Fonts
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Font customization tools will appear here. Choose styles that fit
              your brand.
            </p>
          </Card>
        )}

        {/* Selected Template Info - Browse Tab Only */}
        {selectedTemplate && activeTab === "browse" && (
          <Card 
            id="selected-template-info"
            className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 mb-8 transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Template Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div 
                  className="h-64 relative" 
                  style={{
                    background: `linear-gradient(45deg, ${selectedTemplate.colorIndicator}22, ${selectedTemplate.colorIndicator}44)`,
                    borderBottom: `3px solid ${selectedTemplate.colorIndicator}`
                  }}
                >
                  {/* Visual mockup of invoice */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md w-full h-48 p-4 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="w-16 h-16 rounded-md" style={{ backgroundColor: selectedTemplate.colorIndicator }}></div>
                        <div className="text-sm font-bold dark:text-white">INVOICE #12345</div>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-500 mb-2"></div>
                        <div className="h-2 w-1/2 bg-gray-200 dark:bg-gray-500 mb-2"></div>
                        <div className="h-2 w-2/3 bg-gray-200 dark:bg-gray-500"></div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-500"></div>
                        <div className="h-6 w-20" style={{ backgroundColor: selectedTemplate.colorIndicator + '66' }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Premium badge */}
                  {selectedTemplate.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 dark:bg-yellow-600 text-white">
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                  {selectedTemplate.previewDescription}
                </div>
              </div>

              {/* Template Details */}
              <div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center md:justify-start justify-center">
                    <svg
                      className="w-6 h-6 text-green-500 dark:text-green-400 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {selectedTemplate.name} Template Selected
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedTemplate.description}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    {selectedTemplate.features.map((feature, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                    <Button
                      onClick={handleUseTemplate}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Continue with This Template →
                    </Button>
                    <Button
                      onClick={() => setActiveTab("customize")}
                      variant="outline"
                      className="border-2 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-8 py-3 rounded-xl font-semibold transition-all duration-300 mt-2 sm:mt-0"
                    >
                      ✏️ Customize Fonts
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Custom Template CTA */}
        <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Template?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find the perfect template for your business? Our AI-powered
            design system can create a custom template based on your brand
            colors, logo, and preferences.
          </p>
          <Button className="bg-white dark:bg-gray-200 text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-300 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            🤖 Create Custom Template with AI
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TemplatesPage;
