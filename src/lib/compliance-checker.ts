/**
 * Compliance Checker for RetailSync AI
 * Validates ads against Tesco brand guidelines
 */

export interface ComplianceCheck {
  id: string;
  name: string;
  category: 'brand' | 'legal' | 'accessibility' | 'quality' | 'conversion';
  passed: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
}

export interface ComplianceResult {
  score: number;
  passed: boolean;
  checks: ComplianceCheck[];
  suggestions: string[];
}

// Tesco Brand Colors
export const TESCO_COLORS = {
  blue: '#00539f',
  red: '#e4002b',
  white: '#ffffff',
  black: '#000000',
  lightGray: '#f5f5f5',
  darkGray: '#333333',
};

// Brand Guidelines
const BRAND_GUIDELINES = {
  minLogoSize: 40,
  maxTextLength: 150,
  minFontSize: 12,
  maxFontSize: 72,
  requiredElements: ['cta', 'logo'],
  forbiddenWords: ['free*', 'guaranteed', 'best price ever', 'lowest price'],
  recommendedCTAs: ['Shop Now', 'Buy Now', 'Add to Basket', 'Learn More', 'Discover'],
};

export class ComplianceChecker {
  private checks: ComplianceCheck[] = [];

  /**
   * Run all compliance checks on canvas objects
   */
  checkCompliance(canvasData: any): ComplianceResult {
    this.checks = [];
    
    const objects = canvasData.objects || [];
    
    // Run all checks
    this.checkBrandColors(objects);
    this.checkLogoPresence(objects);
    this.checkTextReadability(objects);
    this.checkCTAPresence(objects);
    this.checkImageQuality(objects);
    this.checkLegalCompliance(objects);
    this.checkAccessibility(objects);
    this.checkLayoutBalance(objects, canvasData);
    
    // Calculate score
    const passedChecks = this.checks.filter(c => c.passed).length;
    const totalChecks = this.checks.length;
    const score = Math.round((passedChecks / totalChecks) * 100);
    
    // Generate suggestions
    const suggestions = this.checks
      .filter(c => !c.passed && c.suggestion)
      .map(c => c.suggestion!);
    
    return {
      score,
      passed: score >= 70,
      checks: this.checks,
      suggestions,
    };
  }

  /**
   * Check if brand colors are being used
   */
  private checkBrandColors(objects: any[]): void {
    const colors = new Set<string>();
    
    objects.forEach(obj => {
      if (obj.fill) colors.add(obj.fill.toLowerCase());
      if (obj.stroke) colors.add(obj.stroke.toLowerCase());
    });
    
    const brandColorValues = Object.values(TESCO_COLORS).map(c => c.toLowerCase());
    const hasBrandColor = Array.from(colors).some(c => 
      brandColorValues.includes(c) || this.isCloseToTescoColor(c)
    );
    
    this.checks.push({
      id: 'brand-colors',
      name: 'Brand Color Usage',
      category: 'brand',
      passed: hasBrandColor,
      message: hasBrandColor 
        ? 'Brand colors are being used correctly' 
        : 'Consider using Tesco brand colors (Blue: #00539f, Red: #e4002b)',
      severity: hasBrandColor ? 'info' : 'warning',
      suggestion: !hasBrandColor ? 'Add Tesco Blue (#00539f) or Red (#e4002b) to improve brand recognition' : undefined,
    });
  }

  /**
   * Check for logo presence
   */
  private checkLogoPresence(objects: any[]): void {
    // Check for image that might be a logo (small image in corner)
    const potentialLogos = objects.filter(obj => 
      obj.type === 'image' && 
      (obj.width * (obj.scaleX || 1)) < 200
    );
    
    const hasLogo = potentialLogos.length > 0;
    
    this.checks.push({
      id: 'logo-presence',
      name: 'Brand Logo Present',
      category: 'brand',
      passed: hasLogo,
      message: hasLogo 
        ? 'Logo detected in the design' 
        : 'No brand logo detected',
      severity: hasLogo ? 'info' : 'error',
      suggestion: !hasLogo ? 'Add the Tesco logo for brand recognition' : undefined,
    });
  }

  /**
   * Check text readability
   */
  private checkTextReadability(objects: any[]): void {
    const textObjects = objects.filter(obj => obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox');
    
    let allReadable = true;
    let issues: string[] = [];
    
    textObjects.forEach(text => {
      const fontSize = text.fontSize || 16;
      
      if (fontSize < BRAND_GUIDELINES.minFontSize) {
        allReadable = false;
        issues.push(`Text "${text.text?.substring(0, 20)}..." is too small (${fontSize}px)`);
      }
      
      if (fontSize > BRAND_GUIDELINES.maxFontSize) {
        issues.push(`Text "${text.text?.substring(0, 20)}..." might be too large`);
      }
    });
    
    this.checks.push({
      id: 'text-readability',
      name: 'Text Readability',
      category: 'accessibility',
      passed: allReadable,
      message: allReadable 
        ? 'All text is readable' 
        : `Readability issues: ${issues.join(', ')}`,
      severity: allReadable ? 'info' : 'warning',
      suggestion: !allReadable ? 'Increase font size to at least 12px for better readability' : undefined,
    });
  }

  /**
   * Check for CTA button presence
   */
  private checkCTAPresence(objects: any[]): void {
    const textObjects = objects.filter(obj => 
      obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox'
    );
    
    const ctaKeywords = ['shop', 'buy', 'add', 'get', 'discover', 'learn', 'order', 'save'];
    const hasCTA = textObjects.some(text => {
      const content = (text.text || '').toLowerCase();
      return ctaKeywords.some(keyword => content.includes(keyword));
    });
    
    // Also check for button-like rectangles with text
    const rects = objects.filter(obj => obj.type === 'rect');
    const hasButtonShape = rects.some(rect => 
      rect.rx > 0 && rect.width < 200 && rect.height < 60
    );
    
    const hasCTAButton = hasCTA || hasButtonShape;
    
    this.checks.push({
      id: 'cta-presence',
      name: 'Call-to-Action Button',
      category: 'conversion',
      passed: hasCTAButton,
      message: hasCTAButton 
        ? 'CTA detected in the design' 
        : 'No clear call-to-action found',
      severity: hasCTAButton ? 'info' : 'error',
      suggestion: !hasCTAButton ? 'Add a clear CTA button like "Shop Now" or "Add to Basket"' : undefined,
    });
  }

  /**
   * Check image quality
   */
  private checkImageQuality(objects: any[]): void {
    const images = objects.filter(obj => obj.type === 'image');
    
    if (images.length === 0) {
      this.checks.push({
        id: 'image-quality',
        name: 'Image Quality',
        category: 'quality',
        passed: true,
        message: 'No images to check',
        severity: 'info',
      });
      return;
    }
    
    // Check if images are scaled up too much (indicates low quality)
    const hasLowQualityImage = images.some(img => 
      (img.scaleX || 1) > 2 || (img.scaleY || 1) > 2
    );
    
    this.checks.push({
      id: 'image-quality',
      name: 'Image Quality',
      category: 'quality',
      passed: !hasLowQualityImage,
      message: hasLowQualityImage 
        ? 'Some images may be low quality (scaled up too much)' 
        : 'Image quality is acceptable',
      severity: hasLowQualityImage ? 'warning' : 'info',
      suggestion: hasLowQualityImage ? 'Use higher resolution images for better quality' : undefined,
    });
  }

  /**
   * Check legal compliance
   */
  private checkLegalCompliance(objects: any[]): void {
    const textObjects = objects.filter(obj => 
      obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox'
    );
    
    const allText = textObjects.map(t => (t.text || '').toLowerCase()).join(' ');
    
    const forbiddenFound = BRAND_GUIDELINES.forbiddenWords.filter(word => 
      allText.includes(word.replace('*', ''))
    );
    
    const isCompliant = forbiddenFound.length === 0;
    
    this.checks.push({
      id: 'legal-compliance',
      name: 'Legal Compliance',
      category: 'legal',
      passed: isCompliant,
      message: isCompliant 
        ? 'No forbidden terms detected' 
        : `Found potentially problematic terms: ${forbiddenFound.join(', ')}`,
      severity: isCompliant ? 'info' : 'error',
      suggestion: !isCompliant ? 'Remove or rephrase terms that make absolute claims' : undefined,
    });
  }

  /**
   * Check accessibility
   */
  private checkAccessibility(objects: any[]): void {
    const textObjects = objects.filter(obj => 
      obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox'
    );
    
    // Check contrast (simplified)
    let hasContrastIssues = false;
    
    textObjects.forEach(text => {
      const fill = (text.fill || '#000000').toLowerCase();
      // Very basic contrast check
      if (fill === '#ffffff' || fill === 'white') {
        // Light text might have issues on light backgrounds
        hasContrastIssues = true;
      }
    });
    
    this.checks.push({
      id: 'accessibility',
      name: 'Color Contrast',
      category: 'accessibility',
      passed: !hasContrastIssues,
      message: hasContrastIssues 
        ? 'Potential contrast issues detected' 
        : 'Color contrast appears acceptable',
      severity: hasContrastIssues ? 'warning' : 'info',
      suggestion: hasContrastIssues ? 'Ensure text has sufficient contrast with background' : undefined,
    });
  }

  /**
   * Check layout balance
   */
  private checkLayoutBalance(objects: any[], canvasData: any): void {
    if (objects.length === 0) {
      this.checks.push({
        id: 'layout-balance',
        name: 'Layout Balance',
        category: 'quality',
        passed: false,
        message: 'Canvas is empty',
        severity: 'warning',
        suggestion: 'Add content to your ad',
      });
      return;
    }
    
    const canvasWidth = canvasData.width || 728;
    const canvasHeight = canvasData.height || 90;
    const canvasArea = canvasWidth * canvasHeight;
    
    // Calculate total object area
    let totalObjectArea = 0;
    objects.forEach(obj => {
      const width = (obj.width || 100) * (obj.scaleX || 1);
      const height = (obj.height || 100) * (obj.scaleY || 1);
      totalObjectArea += width * height;
    });
    
    const coverage = totalObjectArea / canvasArea;
    const isBalanced = coverage > 0.2 && coverage < 0.9;
    
    this.checks.push({
      id: 'layout-balance',
      name: 'Layout Balance',
      category: 'quality',
      passed: isBalanced,
      message: isBalanced 
        ? 'Layout has good balance' 
        : coverage < 0.2 
          ? 'Design appears sparse - add more content' 
          : 'Design appears cluttered - consider removing elements',
      severity: isBalanced ? 'info' : 'warning',
      suggestion: !isBalanced 
        ? coverage < 0.2 
          ? 'Add more visual elements to fill the space' 
          : 'Remove some elements for a cleaner design'
        : undefined,
    });
  }

  /**
   * Check if a color is close to Tesco brand colors
   */
  private isCloseToTescoColor(hex: string): boolean {
    // Simple check - could be improved with actual color distance calculation
    const tescoBlue = '#00539f';
    const tescoRed = '#e4002b';
    
    return hex.includes('00') && hex.includes('9f') || // Close to blue
           hex.includes('e4') || hex.includes('2b');    // Close to red
  }
}

// Singleton instance
export const complianceChecker = new ComplianceChecker();

export default complianceChecker;
