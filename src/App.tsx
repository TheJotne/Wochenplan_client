import { useEffect, useRef, useState } from 'react'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { SchoolClass, SchoolClassTypes, TaskForm } from './type/page';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { useTaskStore, WOCHENPLAN } from './states/TaskState';
import './App.css'
import PageView from './components/PageView';
import PageHeaderView from './components/PageHeaderView';
import HomeworkView from './components/HomeworkView';




function App() {
  const ref = useRef<HTMLDivElement>(null)
  const { pages, currentPage, addPage, deltePage, setCurrentPage, addClass, deleteClass, setPages, updateClass, from, till, setFrom, setTill } = useTaskStore();

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
  const generateBase64 = async (fileName: string) => {
    const base64 = await convertBase64("./images/" + fileName + ".png");
    return base64
  }

  let images: any
  (async () => {
    let images: Record<string, string> = {}
    const schoolClassKeys = Object.values(SchoolClassTypes)
    const TaskFormsKeys = Object.values(TaskForm)
    schoolClassKeys.map(async (key, index) => {
      const fileAsBase64 = await generateBase64(key)
      images[key] = fileAsBase64 as string

    })
    TaskFormsKeys.map(async (key, index) => {
      const fileAsBase64 = await generateBase64(key)
      images[key] = fileAsBase64 as string
    })
    return await images;
  })().then(record => {
    images = record
  })

  useEffect(() => {
    const wochenplanStringified = localStorage.getItem(WOCHENPLAN)
    //wochenplanStringified ? console.log(JSON.parse(wochenplanStringified)) : null
    wochenplanStringified ?
      setPages(JSON.parse(wochenplanStringified)) : null
  }, [])



  function generateTable(pageNumber: number) {
    let body: any = []
    body.push(
      [
        { text: 'Lernbereich', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Was?', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Aufgaben', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Wie?', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Kontrolle', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: '✔', style: 'tableHeader', colSpan: 1, alignment: 'center' }
      ]
    )
    pages[pageNumber].elements.map((schoolCLassElement) => {

      schoolCLassElement.tasks.map((task, index) => {
        console.log(schoolCLassElement.schoolClass)
        let row
        if (index === 0) {
          row = [

            {
              image: images[schoolCLassElement.schoolClass],
              cover: { width: 70, height: 70 }, alignment: 'center',
              rowSpan: schoolCLassElement.tasks.length
            },
            { text: task.category, alignment: 'center' },
            { text: task.headline + "\n" + task.subHeadline },
            {
              image: images[task.form],
              cover: { width: 70, height: 70 }, alignment: 'center',
              //rowSpan: schoolCLassElement.tasks.length
            },
            { text: task.control, alignment: 'center' },
            { text: "", alignment: 'center' },
          ]
        }
        else {
          row = [
            "",
            { text: task.category, alignment: 'center' },
            { text: task.headline + "\n" + task.subHeadline },
            {
              image: images[task.form],
              cover: { width: 70, height: 70 }, alignment: 'center',
              //rowSpan: schoolCLassElement.tasks.length
            },
            { text: task.control, alignment: 'center' },
            { text: "", alignment: 'center' },
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
          widths: ['*', 50, 'auto', '*', '*', 10],
          keepWithHeaderRows: 1,
          body: body

        }
      },
    ]


  }

  function generateHomeworkList(pageNumber: number) {
    let body: any = []

    pages[pageNumber].homeworks.map(homework => {

      body.push(homework.date + "    " + homework.class + "    " + homework.description)
    })
    return { ol: body }

  }





  function saveStateAsFile() {
    const date = new Date()
    // file setting
    const text = JSON.stringify(pages);
    const name = "Wochenplan" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".json";
    const type = "text/plain";

    // create file
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();

  }
  function handleSubmit(event: any) {

    event.preventDefault();
    let files = event.target[0].files
    if (!files) return;

    let reader = new FileReader();
    reader.readAsText(files[0]);
    reader.addEventListener(
      "load",
      () => {
        reader.result && typeof reader.result == "string" ?
          setPages(JSON.parse(reader.result))
          : null
      },
      false,
    );

  }
  function generateUseFullDate(date: Date) {
    return "" + date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
  }

  const generatePdf = async () => {

    const image: any = await generateBase64("Deutsch")
    let completeContent: any = [

    ]
    pages.map((page, index) => {
      completeContent.push({ text: 'Wochenplan  ' + generateUseFullDate(from) + " bis " + generateUseFullDate(till), style: 'header' },)
      completeContent.push(generateTable(index))
      completeContent.push(generateHomeworkList(index))
      if (pages.length - 1 != index) {
        completeContent.push({ text: 'Seite  ' + (index + 1), pageBreak: 'after' })
      }
    })

    let docDefinition = {
      content: completeContent,
      styles: {
        header: {
          bold: true,
          fontSize: 15
        }
      }
      /* [
        { text: 'Wochenplan  ' + generateUseFullDate(from) + " bis " + generateUseFullDate(till), style: 'header' },

        generateTable(image)
      ] */
    }

    pdfMake.createPdf(docDefinition).open();
  }




  return (
    <>
      <h1 className='text-center mb-2'>Wochenplan: </h1>
      <div className='flex gap-5 w-fit m-auto'>
        <div className='fit-content'>von </div><input className='fit-content' type="date" id="wochenplanStart" name="wochenplanStart" value={from.toISOString().substr(0, 10)} onChange={(e) => {
          if (e.target.valueAsNumber)
            setFrom(new Date(e.target.valueAsNumber))

        }} />
        <div className='fit-content'> bis </div><input className='fit-content' type="date" id="wochenplanEnd" name="wochenplanEnd" value={till.toISOString().substr(0, 10)}
          onChange={(e) => {
            if (e.target.valueAsNumber)
              setTill(new Date(e.target.valueAsNumber))

          }} />
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          {pages.map((page, index) => {
            return <PageHeaderView page={page} index={index} />
          })}

        </div>
        <PageView />

        <button className='delete-or-add-button_with-more-text w-fit ml-6' onClick={() => { addClass() }}>+ Fach</button>
        <HomeworkView />
      </div>



      <div ref={ref} id="container"></div>
      <button onClick={generatePdf}> pdf gernerieren</button>
      <button onClick={saveStateAsFile}> Wochenplan speichern</button>
      <h4>alten Wochenplan hochladen</h4>
      <form id="upload" onSubmit={handleSubmit}>
        <input type="file" id="file" accept=".json" />

        <button>Upload</button>
      </form>
    </>
  )
}

export default App

