import { useEffect, useRef, useState } from 'react'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Page, SchoolClasses, TaskCategory, TaskControl, TaskForm } from './type/page';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const firstTable: Page =
{
  pageNumber: 1,
  elements: [
    {
      schoolClass: SchoolClasses.DEUTSCH,
      tasks: [
        {
          category: TaskCategory.PFLICHT,
          control: TaskControl.KEINE,
          evaluation: "",
          form: TaskForm.EINZEL,
          headline: "Das ist ein Test",
          subHeadline: "darunter",
          ready: false,
          symbol: "ein Bild"
        },
        {
          category: TaskCategory.HA,
          control: TaskControl.ABGEBEN,
          evaluation: "",
          form: TaskForm.GRUPPE,
          headline: "Das ist ein Test",
          subHeadline: "darunter",
          ready: false,
          symbol: "ein Bild"
        }
      ]
    },
    {
      schoolClass: SchoolClasses.KUNST,
      tasks: [
        {
          category: TaskCategory.PFLICHT,
          control: TaskControl.KEINE,
          evaluation: "",
          form: TaskForm.EINZEL,
          headline: "Das ist ein Test",
          subHeadline: "darunter",
          ready: false,
          symbol: "ein Bild"
        }
      ]
    }
  ]
}


function App() {
  const ref = useRef<HTMLDivElement>(null)

  const convertBase64 = async (file: String) => {

    let fileLocal = await (await fetch("./" + file)).blob()

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileLocal);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };




  const generatePdf = async () => {

    const image = await generateBase64()
    console.log(image)
    var docDefinition = {
      content: [
        {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [320, 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              [{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              [{ rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3'],
              ['', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              [[{
                image: image,
                cover: { width: 100, height: 100 },
              }, "test"], { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, ''],
              [{

                image: image,
                fit: [100, 100],
              }, '', ''],
            ]
          }
        },
      ]
    }

    pdfMake.createPdf(docDefinition).open();
  }
  const generateBase64 = async () => {
    const base64 = await convertBase64("/goose.jpg");
    return base64
  }
  return (
    <>
      <h1>Das ist der Start</h1>
      <div ref={ref} id="container"></div>
      <button onClick={generatePdf}> pdf gernerieren</button>
    </>
  )
}

export default App
