import Header from "@/components/Dashboard/Header";
import SideNav from "@/components/Dashboard/SideNav";

export default function layout({ children }) {
  return (
    <div>
      <div className="md:w-64 fixed hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}
