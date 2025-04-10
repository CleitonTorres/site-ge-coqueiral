import { SAAE } from '@/@types/types';
import styles from './dashboard.module.css';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

type Props = {
    listSaaes: SAAE[];
}

export default function Dashboard({listSaaes}: Props) {
    const atividadesOrdenadasPorRisco = [...listSaaes]
    .filter(s => s.grauRisco?.value)
    .sort((a, b) => b.grauRisco.value - a.grauRisco.value)
    .slice(0, 10) // top 10
    .map(saae => ({
        atividade: saae.dadosGerais.nomeAtividade || 'Atividade',
        risco: saae.grauRisco.value,
    }));

    //mostra quantas atividades foram classificadas em cada grau de risco.
    const distribuicaoRisco = listSaaes.reduce((acc, saae) => {
        const color = saae.grauRisco.color || 'indefinido';
        acc[color] = (acc[color] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const pieData1 = Object.entries(distribuicaoRisco).map(([color, value]) => ({
        id: color,
        label: color,
        value,
    }));

    const totalEnfermaria = listSaaes.reduce((acc, s) => acc + (s.relatorio?.ocorrenciasEnfermaria?.length || 0), 0);
    const totalGraves = listSaaes.reduce((acc, s) => acc + (s.relatorio?.ocorrenciasGraves?.length || 0), 0);

    const pieData2 = [
    { id: 'Enfermaria', label: 'Enfermaria', value: totalEnfermaria },
    { id: 'Graves', label: 'Graves', value: totalGraves },
    ];

    const ocorrenciasPorAtividade = listSaaes.map((saae) => ({
        atividade: saae.dadosGerais?.nomeAtividade || 'Atividade',
        enfermaria: saae.relatorio?.ocorrenciasEnfermaria?.length || 0,
        graves: saae.relatorio?.ocorrenciasGraves?.length || 0,
    }));

    if(listSaaes?.length === 0){ return <h6>sem dados para mostrar</h6>}
    return(
        <div className={styles.conteiner}>
            <div className={styles.content}>
                <h1>Ocorrências por Evento</h1>
                <ResponsiveBar
                    data={ocorrenciasPorAtividade}
                    keys={['enfermaria', 'graves']}
                    indexBy="atividade"
                    margin={{ top: 20, right: 30, bottom: 120, left: 30 }}
                    padding={0.3}
                    groupMode="grouped"
                    colors={{ scheme: 'set2' }}
                    axisBottom={{ tickRotation: -30 }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                />
            </div>
            <div className={styles.content}>
                <h1>Top 10 Atividades com Maior Grau de Risco</h1>
                <ResponsiveBar
                    data={atividadesOrdenadasPorRisco}
                    keys={['risco']}
                    indexBy="atividade"
                    colors={{ scheme: 'accent' }}
                    layout="horizontal"
                    margin={{ top: 20, right: 50, bottom: 50, left: 100 }}
                />
            </div>
            <div className={styles.content}>
                <h1>Total de Ocorrências Graves vs Enfermaria</h1>
                <ResponsiveBar
                    data={pieData2}
                    margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
                    colors={{ scheme: 'paired' }}
                />
            </div>
            <div className={styles.content}>
                <h1>Distribuição de Grau de Risco.</h1>
                <h6>Mostra quantas atividades foram classificadas em cada grau de risco.</h6>
                <ResponsivePie
                    data={pieData1}
                    margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.4}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={({ id }) =>
                        id === 'green'
                        ? '#4caf50'
                        : id === 'yellow'
                        ? '#ffeb3b'
                        : id === 'orange'
                        ? '#ff9800'
                        : id === 'red'
                        ? '#f44336'
                        : '#9e9e9e'
                    }
                    />
            </div>
        </div>
    )
}