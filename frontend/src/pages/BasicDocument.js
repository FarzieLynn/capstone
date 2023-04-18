
// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#d11fb6",
//     color: "white",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//   },
//   viewer: {
//     width: window.innerWidth, //the pdf viewer will take up all of the width and height
//     height: window.innerHeight,
//   },
// });

// // Create Document Component
// function BasicDocument() {
//   return (
//     <PDFViewer style={styles.viewer}>
//       {/* Start of the document*/}
//       <Document>
//         {/*render a single page*/}
//         <Page size="A4" style={styles.page}>
//           <View style={styles.section}>
//          <MentalHealth />
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   );
// }
// export default BasicDocument;