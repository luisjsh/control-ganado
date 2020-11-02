import React, {useState} from 'react'

import '../add-page-styles.scss'

import CustomInput from "../../custom-input/custom-input";
import Custombutton from "../../custom-button/custom-button";
import PhotoCarousel from "../../image-carousel-add/image-carousel-add";
import ImageCard from "../../image-card/image-card";
import DropdownInput from '../../dropdown-with-input-text/dropdown-with-input'
import DropdownSelect from '../../dropdown-select/dropdown-select'


function MainInfoStep({
    hierroInformation,
    pelajeInformation, 
    searchParents, 
    fatherArray, 
    motherArray, 
    handleClick,
    updateClickedParent,
    updateState}){

    const [Data, setData] = useState({
      hierro: "",
      nombre: "",
      pelaje: "",
      padreId: 0,
      madreId: 0,
      sexo: "Hembra",
      encaste: '',
      tatuaje: '',
      motherArray: false,
      fatherArray: false,
      motherSearchbarValue: "",
      fatherSearchbarValue: "",
      mother: "",
      father: "",
      hierroDropdownSelectedImage: false,
      hierroDropdownSelected: false,
      x: 0,
      porcentaje: 100,
      porcentajeInput: 0
    })
    
    const [image, setImage] = useState({
        url: false,
        files: {},
        photos: false
    })

    const [Date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    })

    const [parentForm, setParentForm] = useState({
        mother: '',
        father: ''
    })
    
    const formHandler = (event) =>{
        let { name, value } = event.target;
        setData({ ...Data , [name]: value });
    }
    
    const handleDate = (event) =>{
        let {name, value} = event.target
        setDate({...Date, [name]: value})
    }

    const pelajeSelected = (event) =>{
        event.preventDefault()
        setData({ ...Data, pelaje: event.target.attributes.value.value });
    }

    const handleFile = (event) =>{
        if (event.target.files !== undefined){
            if(event.target.files.length > 0){
                let photosFile = [...event.target.files].map( (item, id)  => {
                return {id, file: URL.createObjectURL(item) , item }
                })
                setImage({ url: photosFile[0].file, files: photosFile, photos: photosFile });
            }
        } else {
            setImage({ url: false, files: false, photos: false})
        }
    }


    const PhotoChanger = (event) =>{
        setImage({ ...image, url: event.target.attributes.value.value }); 
    }

    
    const hierroSelectedImage = (event) =>{
        let { name, value } = event.target;
        setData({
            ...Data,
            hierroDropdownSelectedImage: name,
            hierroDropdownSelected: value,
        });
    }

    const handleFormParents = (event) =>{
        let {name, value} = event.target
        setParentForm({...parentForm, [name]:value})
        searchParents(name, value)
    }

    const handleClickParents = (event) =>{
        let {name} = event.target
        setParentForm({...parentForm, [name]:''})
        searchParents(name, '')
    }

    const selectedParentFather = (id, nombre, hierro, fechanac, torosimagenes) => {
        setData({...Data, padreId: id})
        updateClickedParent('fatherArray', [{id, nombre, hierro, fechanac, torosimagenes}])    
    }
    
    const selectedParentMother = (id, nombre, hierro, fechanac, torosimagenes) =>{
        setData({...Data, madreId: id})
        updateClickedParent('motherArray', [{id, nombre, hierro, fechanac, torosimagenes}])    

    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        updateState('firstStep', 
        {...Data,
            files: image.files,
            fechaNac: `${Date.day}-${Date.month}-${Date.year}`
        })
        handleClick()
        
    }

return (
    <form onSubmit={handleSubmit}>
        <div className="add-page">
            <PhotoCarousel
                photoChanger={PhotoChanger}
                url={image.url}
                handleFile={handleFile}
                photos={image.photos}
            />

            <div className="card-information">
            <h3 className='h3'>Informacion</h3>
            <div className="information-enter">
                 
               <CustomInput
                    name="nombre"
                    value={Data.nombre}
                    onChange={formHandler}
                    label="Nombre"
                    required
                     />

                <DropdownInput 
                    id='pelaje' 
                    name="pelaje"
                    onChange={formHandler}
                    labelName='Pelaje' 
                    value={Data.pelaje}
                    autoComplete='off'
                    required
                    >
                    {pelajeInformation
                        ? pelajeInformation.response.map(
                            ({ id, nombre }) =>
                            nombre
                                .toLowerCase()
                                .indexOf(Data.pelaje.toLowerCase()) > -1 ? (
                                <button
                                key={id}
                                name="pelaje"
                                value={nombre}
                                onClick={pelajeSelected}
                                    >
                                {nombre}
                                </button>
                            ) : (
                                ""
                            )
                        )
                        : ""}</DropdownInput>
                

                    
                    <div className="birth-date">
                        <p>Fecha de nacimiento</p>
                        <div className='birth-grid'>
                        <CustomInput name='day' value={Date.day} handleChange={handleDate} paddingWrapper='0' placeholder='Dia' maxLength='2' pattern="[0-9]{2}" required/>
                        <CustomInput name='month' value={Date.month} handleChange={handleDate} paddingWrapper='0' placeholder='Mes' maxLength='2' pattern="[0-9]{2}" required/>
                        <CustomInput name='year' value={Date.year} handleChange={handleDate} paddingWrapper='0' placeholder='Año' maxLength='4' pattern="[0-9]{4}" required/>
                        </div>
                    </div>

                <div className="hierro">
                    <label htmlFor="hierro">Hierro</label>
                    <div className="hierro-section" label="hierro">
                    <div className="image-select">
                        <div
                        tabIndex={0}
                        className="image-select"
                        style={{
                            background: Data.hierroDropdownSelectedImage
                            ? Data.hierroDropdownSelectedImage
                            : "",
                        }}
                        ></div>

                        <div className="image-select-list">
                        {hierroInformation
                            ? hierroInformation.response.map(
                                ({ id, path }) => (
                                <button
                                    key={id}
                                    value={id}
                                    name={
                                    "url(http://localhost:4000" +
                                    path +
                                    ") center center / 70% no-repeat"
                                    }
                                    style={{
                                    background:
                                        "url(http://localhost:4000" + path + ") center center / 70% no-repeat",
                                    backgroundColor: '#d4d4d4'
                                    }}
                                    onClick={hierroSelectedImage}
                                />
                                )
                            )
                                : ""}
                        </div>
                    </div>

                    <input
                        name="hierro"
                        value={Data.hierro}
                        onChange={formHandler}
                        required
                    ></input>
                    </div>
                </div>


                    <CustomInput name='encaste' value={Data.encaste} handleChange={formHandler} label='Encaste' required/>

                    <CustomInput name='tatuaje' value={Data.tatuaje} handleChange={formHandler} label='Tatuaje' required/>

                    <DropdownSelect labelName='Sexo' onChange={formHandler} name='sexo' value={Data.sexo} required>
                        <option value="Hembra">Hembra</option>
                        <option value="Macho">Macho</option>
                    </DropdownSelect>

            </div>

            <div className="family-choose">
                <div className="mother">
                <h3 className='h3'>Madre</h3>

                    <CustomInput 
                        name='mother' 
                        value={parentForm.mother} 
                        paddingWrapper='0' 
                        handleChange={handleFormParents} 
                        handleClick={handleClickParents}/>
            
                <div className="cards-result">
                    <div className="parents-card">
                    {motherArray
                        ? motherArray.map(
                            ({ id, nombre, hierro, fechanac, torosimagenes,  tientadia, tientaresultado, tientatentadopor,tientalugar }, i) => (
                            <ImageCard
                                key={id}
                                hierro={hierro}
                                nombre={nombre}
                                fechanac={fechanac.slice(2, 4)}
                                imagenes={torosimagenes}
                                tientaDia={tientadia}
                                tientaResultado={tientaresultado}
                                tientaTentadoPor={tientatentadopor}
                                tientaLugar={tientalugar}
                                animationDelay={i}
                                handleClick={()=>selectedParentMother(id, nombre, hierro, fechanac, torosimagenes)}
                            />
                            )
                        )
                        : ""}
                    </div>
                </div>
                </div>

                <div className="father">
                <h3 className='h3'>Padre</h3>
                <CustomInput 
                    name='father' 
                    value={parentForm.father} 
                    paddingWrapper='0' 
                    handleChange={handleFormParents} 
                    handleClick={handleClickParents}/>

                <div className="cards-result">
                    <div className="parents-card">
                    {fatherArray
                        ? fatherArray.map(
                        ({ id, nombre, hierro, fechanac, torosimagenes,  tientadia, tientaresultado, tientatentadopor,tientalugar }, i) => (
                            <ImageCard
                                key={id}
                                hierro={hierro}
                                nombre={nombre}
                                fechanac={fechanac.slice(2, 4)}
                                imagenes={torosimagenes}
                                tientaDia={tientadia}
                                tientaResultado={tientaresultado}
                                tientaTentadoPor={tientatentadopor}
                                tientaLugar={tientalugar}
                                handleClick={()=>selectedParentFather(id, nombre, hierro, fechanac, torosimagenes)}
                            />
                            )
                        )
                        : ""}
                    </div>
                </div>
                </div>
            </div>
            
            {/*
            <div className="genetic-range">
                <h3>Genetica</h3>
                <div className="genetic-information">
                <div className="porcentaje">{Data.porcentaje}</div>

                <div className="genetica">
                    <CustomInput label="Casta" />
                    <CustomInput
                    label="Porcentaje"
                    name="porcentajeInput"
                    style={{ width: "30px", marginLeft: "20px" }}
                    onChange={this.GeneticRange}
                    value={Data.porcentajeInput}
                    />
                </div>

                <Custombutton color="secundary-blue">Agregar Otro</Custombutton>
                </div>
            </div>
            */}

            <div className="button-section">
                <Custombutton color="primary-blue">
                Guardar
                </Custombutton>
            </div>
            </div>
        </div>
</form>
)
}

export default MainInfoStep
