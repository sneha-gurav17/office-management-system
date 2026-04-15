import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({
  activePage,
  setActivePage,
  pageTitle,
  pageSubtitle,
  selectedEmployee,
  children,
}) {
  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        selectedEmployee={selectedEmployee}
      />

      <div className="app-main">
        <Topbar
          pageTitle={pageTitle}
          pageSubtitle={pageSubtitle}
          selectedEmployee={selectedEmployee}
        />
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}