import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TemplatesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate loading templates when component mounts
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const templates = [
    {
      id: 1,
      name: "Modern Invoice",
      description: "Clean, professional invoice design for modern businesses.",
      features: ["Minimalist layout", "Highlight colors", "Quick branding"],
    },
    {
      id: 2,
      name: "Classic Invoice",
      description: "Traditional design suitable for all industries.",
      features: ["Formal look", "Easy to read", "Business-friendly"],
    },
    {
      id: 3,
      name: "Creative Invoice",
      description: "Stylish template for creative professionals & freelancers.",
      features: ["Customizable fonts", "Brand-focused", "Visual appeal"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Choose Your Invoice Template
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Pick from our professionally designed templates or customize your own.
          Start with a template and make it yours with fonts, colors, and styles.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-gray-200 p-1">
            <Button
              className={`px-6 py-2 rounded-lg ${
                activeTab === "browse"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("browse")}
            >
              Browse Templates
            </Button>
            <Button
              className={`px-6 py-2 rounded-lg ${
                activeTab === "customize"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600"
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
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-blue-500 shadow-xl"
                        : "border-gray-200 hover:shadow-md"
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template);
                      // Scroll to the selected template info section
                      setTimeout(() => {
                        document.getElementById('selected-template-info')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }, 100);
                    }}
                  >
                    <h2 className="text-xl font-bold mb-2">{template.name}</h2>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, i) => (
                        <Badge key={i} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Customize Tab */}
        {activeTab === "customize" && (
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Customize Your Template Fonts
            </h2>
            
            {!selectedTemplate ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Please select a template first to customize its fonts and styles.
                </p>
                <Button 
                  onClick={() => setActiveTab("browse")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Browse Templates
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Font Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heading Font</label>
                        <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700">
                          <option>Arial</option>
                          <option>Helvetica</option>
                          <option>Roboto</option>
                          <option>Open Sans</option>
                          <option>Montserrat</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Body Font</label>
                        <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700">
                          <option>Arial</option>
                          <option>Helvetica</option>
                          <option>Roboto</option>
                          <option>Open Sans</option>
                          <option>Lato</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size</label>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="range" 
                            min="12" 
                            max="20" 
                            defaultValue="16" 
                            className="w-full" 
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">16px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold border-b pb-2 dark:border-gray-700">Color Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Color</label>
                        <div className="flex items-center space-x-3">
                          <input type="color" defaultValue="#3b82f6" className="w-10 h-10 rounded cursor-pointer" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">#3b82f6</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secondary Color</label>
                        <div className="flex items-center space-x-3">
                          <input type="color" defaultValue="#8b5cf6" className="w-10 h-10 rounded cursor-pointer" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">#8b5cf6</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accent Color</label>
                        <div className="flex items-center space-x-3">
                          <input type="color" defaultValue="#10b981" className="w-10 h-10 rounded cursor-pointer" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">#10b981</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t dark:border-gray-700 flex justify-center space-x-4">
                  <Button 
                    onClick={() => setActiveTab("browse")}
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    Back to Templates
                  </Button>
                  <Button 
                    onClick={() => navigate("/create")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    Apply & Continue
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Selected Template Info - Browse Tab Only */}
        {selectedTemplate && activeTab === "browse" && (
          <Card 
            id="selected-template-info"
            className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 mb-8 transition-all duration-300"
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center justify-center">
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

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {selectedTemplate.features.map((feature, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => navigate("/create")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
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
          </Card>
        )}

        {/* Custom Template CTA */}
        <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Template?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Can't find the perfect template for your business? Our AI-powered
            design system can create a custom template based on your brand
            colors, logo, and preferences.
          </p>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            🤖 Create Custom Template with AI
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default TemplatesPage;
