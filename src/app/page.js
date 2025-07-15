// app/page.js
import Hero from "./components/Hero/hero";
import Dobra1Espuma from "./components/Dobra1Espuma/Dobra1Espuma"; // Importe a nova dobra
import Dobra2Gloss from "./components/Dobra2Gloss/Dobra2Gloss"; // Importe a nova dobra
import DobraInterstitialCiencia from "./components/DobraInterstitialCiencia/DobraInterstitialCiencia";
import Dobra3GlossDetalhes from "./components/Dobra3GlossDetalhes/Dobra3GlossDetalhes";
import Dobra4Conexao from "./components/Dobra4Conexao/Dobra4Conexao";
import Dobra5Hidratante from "./components/Dobra5Hidratante/Dobra5Hidratante";
import Dobra6ChamadaProdutos from "./components/Dobra6ChamadaProdutos/Dobra6ChamadaProdutos";
import Dobra7KitIntroducao from "./components/Dobra7KitIntroducao/Dobra7KitIntroducao";
import Footer from "./components/Footer/Footer";
import DobraOfertaProdutos from "./components/DobraOfertaProdutos/DobraOfertaProdutos"; 
import DobraVideoEspuma from "./components/DobraVideoEspuma/DobraVideoEspuma";
import DobraVideoBBSkin from "./components/DobraVideoBBSkin/DobraVideoBBSkin"; // <<-- Importe aqui
import DobraBBSkinDetalhes from "./components/DobraBBSkinDetalhes/DobraBBSkinDetalhes"; // <<-- Importe aqui
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'; // Importação do botão WhatsApp



// Importe outros componentes de dobra aqui conforme criá-los
// import Dobra2Serum from "@/components/Dobra2Serum/Dobra2Serum";
// ... e assim por diante
export default function Home() {
  return (
    <div className="scroll-container">
            <WhatsAppButton />

      <Hero />
      <Dobra1Espuma />
            <DobraVideoEspuma /> {/* <<-- Adicionado aqui */}

      <DobraInterstitialCiencia />
      < Dobra6ChamadaProdutos />
      <DobraBBSkinDetalhes /> {/* <<-- Adicione aqui */}

      <Dobra4Conexao />
      <Dobra3GlossDetalhes />

    
       <DobraOfertaProdutos />
      {/* Renderize as próximas dobras aqui (Sérum, BBBlur, etc.) */}
      {/* <Dobra3Serum /> */}
      {/* <Dobra4BBBlur /> */}
      {/* ... */}

       <Footer />
    </div>
  );
}