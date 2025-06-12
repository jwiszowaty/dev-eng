export default function Note({ loading, html, name}) {
    
  return (
    <div className="w-2/6">
      <p>{name}</p>
      {loading && <p>loading</p>}
      {!loading && <div
        className="prose max-w-none p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />}
      </div>
    );
}