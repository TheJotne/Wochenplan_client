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

  function generateTable(image: string) {
    let body: any = []
    body.push(
      [
        { text: 'Lernbereich', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Was?', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Aufgaben', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Kontrolle', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Wie?', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Fertig?', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Wie war es?', style: 'tableHeader', colSpan: 1, alignment: 'center' }
      ]
    )
    firstTable.elements.map((schoolCLassElement) => {
      schoolCLassElement.tasks.map((task, index) => {
        let row
        if (index === 0) {
          row = [
            [
              {
                image: image,
                cover: { width: 70, height: 70 },
                rowSpan: schoolCLassElement.tasks.length
              },
              { rowSpan: schoolCLassElement.tasks.length, text: schoolCLassElement.schoolClass, alignment: 'center' }
            ],
            { text: task.category, alignment: 'center' },
            { text: task.headline + "\n" + task.subHeadline },
            { text: task.control, alignment: 'center' },
            { text: task.form, alignment: 'center' },
            { text: "", alignment: 'center' },
            { text: task.evaluation, alignment: 'center' },
          ]
        }
        else {
          row = [
            "",
            { text: task.category, alignment: 'center' },
            { text: task.headline + "\n" + task.subHeadline },
            { text: task.control, alignment: 'center' },
            { text: task.form, alignment: 'center' },
            { text: "", alignment: 'center' },
            { text: task.evaluation, alignment: 'center' },
          ]
        }
        body.push(row)
      })

    })
    return [
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto', 'auto', 220, 'auto', 'auto', 'auto', 'auto'],
          //headerRows: 1,
          keepWithHeaderRows: 1,
          body: body
        }
      },
    ]


  }



  const generatePdf = async () => {

    const image: any = await generateBase64()

    let docDefinition = {
      content: generateTable(image)
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

/*
[
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
              ['', 'Sample value 2 new line', 'Sample value 3 new line'],
              ['Sample value 1 i am missing', 'Sample value 2', 'Sample value 3'],
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
*/