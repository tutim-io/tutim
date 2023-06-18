import { BrowserRouter } from 'react-router-dom';
import '@tutim/shadcn-ui/dist/output.css';
import { JsonSkeleton } from '@tutim/shadcn-ui';
import jsonCompositionExample from './composition.json';

// import jsonComposition from './tutim/AnalyticsDashboard/composition.json';
import AnalyticsDashboardPageDemo from './AnalyticsDashboardExample/demo';

// Example of generated React component from the JSON composition
const DashboardExample = () => {
  // return <AnalyticsDashboardPageExampleDemo />; // Example demo
  return <JsonSkeleton json={jsonCompositionExample} />; // Example JSON skeleton
};

function App() {
  return (
    <BrowserRouter>
      <AnalyticsDashboardPageDemo />
      {/* <AnalyticsDashboard /> */}
      {/* <SaasCrmLandingPageExample /> */}
    </BrowserRouter>
  );
}

export default App;
