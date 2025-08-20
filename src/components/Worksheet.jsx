import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function Worksheet({ setWorksheet, worksheet, pdfUrl }) {
  return (
    <div className="h-full box-border max-w-5xl pt-2">
      <iframe src={pdfUrl} width="100%" height="100%"></iframe>
    </div>
  );
}
