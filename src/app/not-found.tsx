import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flexCollCenter">
        <h1>404 - Página não encontrada</h1>
        <p>A página que você tentou acessar não existe.</p>
        <Image 
          alt="not-found"
          src={"/logo/not-found.png"}
          width={300}
          height={300}
          style={{
            borderRadius: '50%',
            margin: 10
          }}
        />
        <Link href="/" className="link">Voltar para a Home</Link>
      </div>
    );
  }
  