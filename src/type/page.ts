export interface Page {
    pageNumber: number,
    elements: SchoolClass[]
    homeworks: Homework[]
}
export interface Homework {
    id: string
    date: HomeworkEnum
    class: SchoolClassTypes
    description: string

}

export interface SchoolClass {
    id: string
    schoolClass: SchoolClassTypes
    tasks: Task[]
}

export enum SchoolClassTypes {
    Deutsch = "Deutsch",
    Mathe = "Mathe",
    HSK = "HSK",
    Kunst = "Kunst",
    Englisch = "Englisch",
    Sport = "Sport",
    Französisch = "Französisch",
    Schulgarten = "Schulgarten",
    Werken = "Werken",
    Musik = "Musik",
    Ergänzung = "Ergänzung",
    Projekt = "Projekt",

}
export interface Task {
    id: string
    symbol: string
    headline: string
    subHeadline: string
    category: TaskCategory
    form: TaskForm
    control: TaskControl
    ready: boolean
    evaluation: string //3 smileys die die Kinder markieren wie sie die Aufgabe fanden
}

export enum TaskCategory {
    Pflicht = "Pflicht",
    Zusatz = "Zusatz",
    HA = "HA"
}
export enum TaskForm {
    Einzeln = "Einzeln",
    Partner = "Partner",
    Gruppe = "Gruppe"
}
export enum TaskControl {
    Abgeben = "Abgeben",
    Lösung = "Lösung",
    Melden = "Melden",
    Keine = "Keine"
}

export enum TaskSelectType {
    Kategorie = "Kategorie",
    Form = "Form",
    Kontrolle = "Kontrolle",
    Klasse = "Klasse"
}


export enum HomeworkEnum {
    BIS_DIENSTAG = "bis Dienstag",
    BIS_MITTWOCH = "bis Mittwoch",
    BIS_DONNERSTAG = "bis Donnerstag",
}

