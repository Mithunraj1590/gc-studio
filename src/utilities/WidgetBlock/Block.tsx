import React from "react";
import HomeBanner from "@/widgets/HomeBanner";
import TwoColumnSection from "@/widgets/TwoColumnSection";
import AboutSection from "@/widgets/AboutSection";
import CTASection from "@/widgets/CTASection";
import HomeProject from "@/widgets/HomeProject";
import HomeBlog from "@/widgets/HomeBlog";
import FAQSection from "@/widgets/FAQSection";
import HomeService from "@/widgets/HomeService";
import HomeProcess from "@/widgets/HomeProcess";
import InnerBanner from "@/widgets/InnerBanner";
import AboutGrid from "@/widgets/AboutGrid";
import AboutTeam from "@/widgets/AboutTeam";
import ServiceList from "@/widgets/ServiceList";
import ImpactStats from "@/widgets/ImpactStats";
import ProjectList from "@/widgets/ProjectList";
import WorkDetailBanner from "@/widgets/WorkDetailBanner";
import WorkCaseStudy from "@/widgets/WorkCaseStudy";
import ContactPage from "@/widgets/ContactPage";
import BlogList from "@/widgets/BlogList";
import BlogDetailBanner from "@/widgets/BlogDetailBanner";
import BlogDetailContent from "@/widgets/BlogDetailContent";
import ServiceDetailAbout from "@/widgets/ServiceDetailAbout";
// import AnotherWidget from "@/widgets/AnotherWidget"; // Import other widgets

interface Widget {
  widget_type?: string;
  [key: string]: any;
}

interface BlockProps {
  widget: Widget;
}

const DefaultComponent: React.FC = () => <div>Unknown Widget</div>; // Default component

const setComponent = (widget: Widget): React.ComponentType<any> => {
  const components: Record<string, React.ComponentType<any>> = {
    HomeBanner: HomeBanner,
    TwoColumnSection: TwoColumnSection,
    AboutSection: AboutSection,
    CTASection: CTASection,
    HomeProject: HomeProject,
    HomeBlog: HomeBlog,
    FAQSection: FAQSection,
    HomeService: HomeService,
    HomeProcess: HomeProcess,
    InnerBanner: InnerBanner,
    AboutGrid: AboutGrid,
    AboutTeam: AboutTeam,
    ServiceList: ServiceList,
    ImpactStats: ImpactStats,
    ProjectList: ProjectList,
    WorkDetailBanner: WorkDetailBanner,
    WorkCaseStudy: WorkCaseStudy,
    ContactPage: ContactPage,
    BlogList: BlogList,
    BlogDetailBanner: BlogDetailBanner,
    BlogDetailContent: BlogDetailContent,
    ServiceDetailAbout: ServiceDetailAbout,
    // AnotherWidget: AnotherWidget, // Add more components as needed
  };
  return components[widget.widget_type || ''] || DefaultComponent; // Use DefaultComponent if widget_type is unknown
};

const Block: React.FC<BlockProps> = ({ widget }) => {
  const Widget = setComponent(widget);
  return (
    <Widget
      {...widget}
    />
  );
};

export default Block;

