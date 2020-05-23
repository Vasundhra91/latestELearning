import React from 'react';
import { Image,PDFViewer,Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
      height:'100%',
      padding: 30,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      '@media max-width: 400': {
        flexDirection: 'column',
      },
    },
    image: {
      marginBottom: 10,
    },
    leftColumn: {
      flexDirection: 'column',
      width: 170,
      paddingTop: 30,
      paddingRight: 15,
      '@media max-width: 400': {
        width: '100%',
        paddingRight: 0,
      },
      '@media orientation: landscape': {
        width: 200,
      },
    },
    footer: {
      fontSize: 12,
      fontFamily: 'Lato Bold',
      textAlign: 'center',
      marginTop: 25,
      paddingTop: 10,
      borderWidth: 3,
      borderColor: 'gray',
      borderStyle: 'dashed',
      '@media orientation: landscape': {
        marginTop: 10,
      },
    },
  });
  

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={{ backgroundColor: 'tomato' }}>
      <View style={{ color: 'white', textAlign: 'center', margin: 30 }}>
      <View style={styles.leftColumn}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </View>
    </View>
    </Page>
  
  </Document>
  
);
class AdmitCard extends React.Component {
    render()
    {
        return(
            <div style={{ paddingTop: "52px" }}>
            <PDFViewer style={{width:"100%",height:"100%"}}>
                
            <MyDocument />
          </PDFViewer>
          
          <link></link>
          </div>
        )
    }
}
export default AdmitCard;