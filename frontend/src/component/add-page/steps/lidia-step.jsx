import React, {useState} from 'react'

import results from '../../../functions/DATA'
import resultsNumbers from '../../../functions/DATA_NUMBERS'


import {
    Page,
    SectionWithTitle,
    BirthSectionTitle,
    ButtonSection,
    GridForTwo
} from './lidia-step-styles'

import ConfirmationCard from '../../confirmation-card/confirmation-card'
import CustomInput from '../../custom-input/custom-input'
import CustomButton from '../../custom-button/custom-button'
import CustomSelect from '../../dropdown-select/dropdown-select'


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

    const [resultSelect, setResultSelect] = useState({
        capa: '-',
        muleta: '-',
        caballo: '-',
        capaNumber: '-',
        caballoNumber: '-',
        muletaNumber: '-'
    })


    const handleForm = (event) =>{
        let {name, value} = event.target
        setData({...Data, [name]:value})
    }

    const handleDate = (event) =>{
        let {name, value} = event.target
        setDate({...Date, [name]: value})
    }

    const handleSelect = (event) =>{
        let {name, value} = event.target
        setResultSelect({...resultSelect, [name]: value})
    }

    return (
        <form onSubmit={(event)=>{
            event.preventDefault()
            updateState('secondStep',
                {
                    ...Data,
                    tientaDate: `${Date.day}-${Date.month}-${Date.year}`,
                    result: `${resultSelect.capa} (${resultSelect.capaNumber})/${resultSelect.caballo} (${resultSelect.caballoNumber})/${resultSelect.muleta} (${resultSelect.muletaNumber})`
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

                    <BirthSectionTitle title='Resultado'>
                        <CustomInput label='Capa' value={`${resultSelect.capa}   ${resultSelect.capaNumber}`} disabled/>
                        <CustomInput label='Caballo' value={`${resultSelect.caballo}   ${resultSelect.caballoNumber}`} disabled/>
                        <CustomInput label='Muleta' value={`${resultSelect.muleta}    ${resultSelect.muletaNumber}`} disabled/>
                    </BirthSectionTitle>

                    <CustomInput name='place' value={Data.place} handleChange={handleForm} label='Lugar (opcional)' />
                </SectionWithTitle>

                <SectionWithTitle title='Datos de la tienta'>
                    <GridForTwo>
                        <CustomSelect name='capa' onChange={handleSelect} labelName='Resultado capa'>
                            <option>Por favor seleccione una de las siguientes</option>
                            {
                                results.map( ({id, name})=>(
                                    <option key={id} value={name}>{name}</option>
                                ))
                            }
                        </CustomSelect>
                        <CustomSelect  name='capaNumber' onChange={handleSelect} labelName='Resultado capa'>
                            <option>Por favor seleccione una de las siguientes</option>
                            {
                                resultsNumbers.map( ({id})=>(
                                    <option key={id} value={id}>{id}</option>
                                ))
                            }
                        </CustomSelect>
                    </GridForTwo>
                    
                    <CustomInput name='withCape' value={Data.withCape} handleChange={handleForm} label='Con la capa (opcional)'/>
                    
                    <GridForTwo>
                        <CustomSelect name='caballo' onChange={handleSelect} labelName='Resultado caballo'>
                            <option>Por favor seleccione una de las siguientes</option>
                            {
                                results.map( ({id, name})=>(
                                    <option key={id} value={name}>{name}</option>
                                ))
                            }
                        </CustomSelect>
                        
                        <CustomSelect name='caballoNumber' onChange={handleSelect} labelName='Resultado caballo'>
                                <option>Por favor seleccione una de las siguientes</option>
                                {
                                    resultsNumbers.map( ({id})=>(
                                        <option key={id} value={id}>{id}</option>
                                    ))
                                }
                        </CustomSelect>
                    </GridForTwo>
                    
                    <CustomInput name='withHorse' value={Data.withHorse} handleChange={handleForm} label='Con el caballo (opcional)'/>
                    
                    <GridForTwo>
                        <CustomSelect name='muleta' onChange={handleSelect} labelName='Resultado muleta'>
                            <option>Por favor seleccione una de las siguientes</option>
                            {
                                results.map( ({id, name})=>(
                                    <option key={id} value={name}>{name}</option>
                                ))
                            }
                        </CustomSelect>
                        <CustomSelect name='muletaNumber' onChange={handleSelect} labelName='Resultado muleta'>
                                <option>Por favor seleccione una de las siguientes</option>
                                {
                                    resultsNumbers.map( ({id})=>(
                                        <option key={id} value={id}>{id}</option>
                                    ))
                                }
                        </CustomSelect>
                    </GridForTwo>
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
