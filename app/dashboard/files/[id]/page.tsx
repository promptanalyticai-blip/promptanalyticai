import Reactions from "../../components/Reactions";
import Tags from "../../components/Tags";
import Tasks from "../../components/Tasks";
import Header from "../../components/Header";

export default function FileDetailPage({ params }) {
  return (
    <>
      <Header title="Archivo" subtitle={`ID: ${params.id}`} />
      <Reactions />
      <Tags />
      <Tasks />
      {/* contenido */}
    </>
  );
}
