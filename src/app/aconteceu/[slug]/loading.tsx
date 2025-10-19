import LoadIcon from "@/components/layout/loadIcon/loadIcon";

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}>
      <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>
        <LoadIcon showHide />
        Carregando notícia...
      </span>
      
    </div>
  );
}
