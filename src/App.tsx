import { useEffect, useRef, useState } from 'react'

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Page, SchoolClass, SchoolClassTypes, TaskCategory, TaskControl, TaskForm } from './type/page';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { v4 as uuid } from 'uuid';
import TaskInput from './components/TaskInput';
import { useTaskStore } from './states/TaskState';
import './App.css'




function App() {
  const ref = useRef<HTMLDivElement>(null)
  const { taskPerClass, addTask, addClass } = useTaskStore();

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
        { text: 'Wie?', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: 'Kontrolle', style: 'tableHeader', colSpan: 1, alignment: 'center' },
        { text: '✔', style: 'tableHeader', colSpan: 1, alignment: 'center' }
      ]
    )
    taskPerClass.map((schoolCLassElement) => {
      schoolCLassElement.tasks.map((task, index) => {
        let row
        if (index === 0) {
          row = [

            {
              image: image,
              cover: { width: 70, height: 70 },
              rowSpan: schoolCLassElement.tasks.length
            },
            { text: task.category, alignment: 'center' },
            { text: task.headline + "\n" + task.subHeadline },
            { text: task.form, alignment: 'center' },
            { text: task.control, alignment: 'center' },
            { text: "", alignment: 'center' },
          ]
        }
        else {
          row = [
            "",
            { text: task.category, alignment: 'center' },
            { text: task.headline + "\n" + task.subHeadline },
            { text: task.form, alignment: 'center' },
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

  function getClassSelect(page: SchoolClass) {
    const keys = Object.keys(SchoolClassTypes)
    return (


      <select name="classSelect" id={"classSelect" + page.id} >
        {
          keys.map((key, index) => {
            //console.log(`key:${key} class:${page.schoolClass}`)
            if (key === page.schoolClass.toUpperCase()) {
              return (

                <option selected value={key}>{key}</option>
              )
            }
            else {
              return (
                <option value={key}>{key}</option>
              )
            }

          })}
      </select>
    )
  }

  function getTasks(page: SchoolClass) {
    return (<div>
      {
        getClassSelect(page)
      }
      {page.tasks.map(task => {
        return <TaskInput task={task} />
      })}
      <button onClick={() => { addTask(page.id) }}>eine Aufgabe hinzufügen</button>
    </div>
    )
  }

  return (
    <>

      {taskPerClass.map((page: SchoolClass) => {
        return (
          getTasks(page)
        )
      }
      )}
      <button onClick={() => { addClass() }}>Eine Fach hinzufügen</button>
      <div ref={ref} id="container"></div>
      <button onClick={generatePdf}> pdf gernerieren</button>
    </>
  )
}

export default App

/*
lernbereich|was|aufgabe|wie|Kontrolle|fertig -> Reihenfolge PDF

[
       onChange={(event) => {
              let currentTask = Object.assign({}, task)
              
                      currentTask.control = event.currentTarget.value as TaskControl
                  
              }
  
              saveTask(currentTask)
          }}
*/