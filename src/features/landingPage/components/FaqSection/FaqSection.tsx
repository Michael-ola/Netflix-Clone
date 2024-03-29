import React,{useState,useEffect} from 'react'
import {Container,TextHeader,QuestionContainer,QuestionHeader,QuestionBody,Span,Icon,Overlay}  from './styles/FaqSection'
const Questions= require('data/faqs.json')
const closeIcon= require('assets/images/icons/close-slim.png')
const addIcon = require('assets/images/icons/add.png')

interface QuestionType{
    id: number;
    header: string;
    body: string;
}

interface QuestionProps{
    id:number,
    title:string,
    bodyText:string,
    siblingClickedState:number | null,
    siblingClickedHandler:(id:number) => void
}

export const FaqSection = () => {
    return (
        <Container>
            <TextHeader>Frequently Asked Questions</TextHeader>
            <QuestionGenerator/>
        </Container>
    )
}

const QuestionConstruct=(props:QuestionProps):JSX.Element => {
    const [showBodyState,setshowBodyState]=useState<boolean>(false)

    useEffect(()=>{
        if(props.id===props.siblingClickedState){
            setshowBodyState(true)
        }
        else{setshowBodyState(false)}
    },[props.siblingClickedState,props.id])

    const onMouseDownHandler=(id:number) => {
        setshowBodyState((prevshowBodyState) =>!prevshowBodyState)
        props.siblingClickedHandler(id)
    }

    return(  
        <QuestionContainer>
            <QuestionHeader>
                <Overlay onMouseDown={()=>onMouseDownHandler(props.id)}/>
                <Span>{props.title}</Span>
                <Icon src={showBodyState?closeIcon:addIcon}/>
            </QuestionHeader>
            <QuestionBody {...{showBody:showBodyState}} >{props.bodyText}</QuestionBody>
        </QuestionContainer>
    )
}

const QuestionGenerator= ():JSX.Element=>{
    const [siblingClickedState,setSiblingClickedState]=useState<number | null>(null)
    const siblingClickedHandler=(id:number)=>{
        setSiblingClickedState(id)
    }
    return Questions.map((question:QuestionType,id:number)=>{
        return <QuestionConstruct id={id} key={question.id} siblingClickedState={siblingClickedState}
         siblingClickedHandler={siblingClickedHandler}
         title={question.header} bodyText={question.body}/>
    })
}