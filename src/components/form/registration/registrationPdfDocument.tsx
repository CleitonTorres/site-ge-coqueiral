import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { participantName, type PrintableRegistration } from "./printTypes";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    paddingBottom: 48,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#172e46",
  },
  title: { fontSize: 17, marginBottom: 10 },
  note: { fontSize: 9, marginBottom: 16 },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  protocol: { width: "22%", paddingRight: 8 },
  name: { width: "30%", paddingRight: 8 },
  kits: { width: "33%", paddingRight: 8 },
  total: { width: "15%" },
  header: { backgroundColor: "#eef2f6", fontFamily: "Helvetica-Bold" },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 32,
    right: 32,
    textAlign: "center",
    fontSize: 8,
  },
  tickets: { flexDirection: "row", flexWrap: "wrap" },
  ticket: {
    width: "33.333333%",
    height: 94,
    borderWidth: 0.5,
    borderStyle: "dashed",
    borderColor: "#666",
    padding: 8,
  },
  event: {
    fontSize: 8,
    marginBottom: 4,
    maxLines: 2,
    textOverflow: "ellipsis",
  },
  ticketName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    maxLines: 2,
    textOverflow: "ellipsis",
  },
});

export default function RegistrationPdfDocument({
  records,
  tickets,
  title,
  generatedAt,
}: {
  records: PrintableRegistration[];
  tickets: boolean;
  title: string;
  generatedAt: string;
}) {
  const sheets = Array.from(
    { length: Math.ceil(records.length / 21) },
    (_, index) => records.slice(index * 21, (index + 1) * 21),
  );
  
  return (
    <Document title={title} author="Grupo Escoteiro Coqueiral" language="pt-BR">
      {tickets ? (
        sheets.map((sheet, index) => (
          <Page key={index} size="A4" style={styles.page}>
            <Text style={styles.title}>Tickets para sorteio</Text>
            <Text style={styles.note}>
              {title} · Um ticket por inscrição · Recorte nas linhas pontilhadas
            </Text>
            <View style={styles.tickets}>
              {sheet.map((record) => (
                <View
                  key={record.registrationId}
                  style={styles.ticket}
                  wrap={false}
                >
                  <Text style={styles.event}>
                    {record.form.title.slice(0, 100)}
                  </Text>
                  <Text style={styles.ticketName}>
                    {participantName(record).slice(0, 100)}
                  </Text>
                  <Text>
                    Protocolo: {record.protocol || record.registrationId}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.footer}>
              Cartela {index + 1} de {sheets.length}
            </Text>
          </Page>
        ))
      ) : (
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.note}>
            {records.length} inscrições · Gerado em {generatedAt}
            {"\n"}Pagamentos sujeitos à conferência da organização.
          </Text>
          <View style={[styles.row, styles.header]} fixed>
            <Text style={styles.protocol}>Protocolo</Text>
            <Text style={styles.name}>Participante / evento</Text>
            <Text style={styles.kits}>Kits</Text>
            <Text style={styles.total}>Total</Text>
          </View>
          {records.map((record) => (
            <View key={record.registrationId} style={styles.row} wrap={false}>
              <Text style={styles.protocol}>
                {record.protocol || record.registrationId}
              </Text>
              <Text style={styles.name}>
                {participantName(record).slice(0, 150)}
                {"\n"}
                {record.form.title.slice(0, 120)}
              </Text>
              <Text style={styles.kits}>
                {record.kits
                  .map((kit) => `${kit.quantity} × ${kit.name.slice(0, 80)}`)
                  .join("\n") || "Sem kits"}
              </Text>
              <Text style={styles.total}>
                {(record.totalCents / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          ))}
          <Text
            style={styles.footer}
            fixed
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </Page>
      )}
    </Document>
  );
}
