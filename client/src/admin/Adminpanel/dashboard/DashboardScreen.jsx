
import Dashhead from './../../components/dashhead/Dashhead';
import AreaTop from './../../components/areaTop/AreaTop';
import AreaCards from './../../components/areaCards/AreaCards';
import AreaCharts from './../../components/areaCharts/AreaCharts';
import AreaTable from './../../components/areaTable/AreaTable';

const Dashboard = () => {
  return (
    <div className="content-area">
      <Dashhead />
      <AreaTop />
      <AreaCards />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
