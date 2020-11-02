import React, {useState} from 'react'

import {
    Page,
    SectionWithTitle,
    BirthSectionTitle,
    ButtonSection
} from './lidia-step-styles'

import ConfirmationCard from '../../confirmation-card/confirmation-card'
import CustomInput from '../../custom-input/custom-input'
import CustomButton from '../../custom-button/custom-button'


function LidiaStep({updateState, handleClickConfirmation, goBack}) {
    const [Data, setData] = useState({
        temptedBy: '',
        result: '',
        place: '',
        withCape: '',
        withHorse: '',
        withCrutch: ''
    })

    const [Date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    })

    const [confirmation, setConfirmation] = useState(false)

    const handleForm = (event) =>{
        let {name, value} = event.target
        setData({...Data, [name]:value})
    }

    const handleDate = (event) =>{
        let {name, value} = event.target
        setDate({...Date, [name]: value})
    }

    return (
        <form onSubmit={(event)=>{
            event.preventDefault()
            updateState('secondStep',
                {
                    ...Data,
                    tientaDate: `${Date.day}-${Date.month}-${Date.year}`
                })
            setConfirmation(!confirmation)}}>

            {
                confirmation && <ConfirmationCard 
                    handleClick={()=>setConfirmation(!confirmation)}
                    handleSubmit={handleClickConfirmation}
                    />
            }

            <Page>
                <SectionWithTitle title='Tienta'>
                    <BirthSectionTitle title='Fecha de la tienta (opcional)'>
                        <CustomInput name='day' value={Date.day} handleChange={handleDate} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" />
                        <CustomInput name='month' value={Date.month} handleChange={handleDate} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" />
                        <CustomInput name='year' value={Date.year} handleChange={handleDate} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" />
                    </BirthSectionTitle>

                    <CustomInput name='temptedBy' value={Data.temptedBy} handleChange={handleForm} label='Tentada(o) por (opcional)' />
                    <CustomInput name='result' value={Data.result} handleChange={handleForm} label='Resultado (opcional)' />
                    <CustomInput name='place' value={Data.place} handleChange={handleForm} label='Lugar (opcional)' />
                </SectionWithTitle>

                <SectionWithTitle title='Datos de la tienta'>
                    <CustomInput name='withCape' value={Data.withCape} handleChange={handleForm} label='Con la capa (opcional)'/>
                    <CustomInput name='withHorse' value={Data.withHorse} handleChange={handleForm} label='Con el caballo (opcional)'/>
                    <CustomInput name='withCrutch' value={Data.withCrutch} handleChange={handleForm} label='Con la muleta (opcional)'/>
                </SectionWithTitle>

                <ButtonSection>
                    
                    <CustomButton 
                        color='primary-blue' 
                        gridArea='submit'
                        >Guardar</CustomButton>

                <CustomButton
                    onClick={goBack} 
                    color='secundary-red' 
                    gridArea='back'
                    >Volver</CustomButton>

                </ButtonSection>
            </Page>
        </form>
    )
}

export default LidiaStep
