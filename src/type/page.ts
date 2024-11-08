export interface Page {
    pageNumber: number,
    elements: SchoolClass[]
}

export interface SchoolClass {
    id: string
    schoolClass: SchoolClassTypes
    tasks: Task[]
}

export enum SchoolClassTypes {
    DEUTSCH = "Deutsch",
    MATHE = "Mathe",
    HSK = "HSK",
    KUNST = "Kunst",
    ENGLISCH = "Englisch",
    SPORT = "Sport",
    FRANZÖSISCH = "Französisch",
    SCHULGARTEN = "Schulgarten",
    WERKEN = "Werken",
    MUSIK = "Musik",
    ERGÄNZUNG = "Ergänzung",
    PROJEKT = "Projekt",
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
    PFLICHT = "pflicht",
    ZUSATZ = "zusatz",
    HA = "HA"
}
export enum TaskForm {
    EINZEL = "Einzeln",
    PARTNER = "Partner",
    GRUPPE = "Gruppe"
}
export enum TaskControl {
    ABGEBEN = "Abgeben",
    LÖSUNG = "Lösung",
    MELDEN = "Melden",
    KEINE = "Keine"
}

export enum TaskSelectType {
    KATEGORIE = "Kategorie",
    FORM = "Form",
    KONTROLLE = "Kontrolle",
    KLASSE = "Klasse"
}
