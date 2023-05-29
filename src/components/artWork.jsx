import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./css/artwork.scss";
import * as R from "ramda";
import { connect } from "react-redux";
import { loadData } from "../actions";
import CollapseComponent from "./collapse";
import SlideComponent from "./slides";



const ArtWorkComponent = ({
    loadData, 
    imageUrl,
    title,
    category,
    description,
    creationYear,
    price,
    artistShort,
    dimensions,
    subjects,
    mediums,
    styles,
    materials,
    status,
    artWorkItems
}) => {

    const { id } = useParams();

    const fetchData = async (artWorkId) => {
        try {
          const response = await fetch(`https://storage.googleapis.com/ya-misc/interviews/front/examples/${ artWorkId }.json`);
          const data = await response.json();
          return data;
        } catch (error) {
        }
      };

    useEffect(() => {
        fetchData(id).then(data => {loadData(data);});
    }, [loadData, id]);

    const subjectContent = (subjects, mediums, styles, materials) => (
        <table>
            <tbody>
                <tr><td>Subject</td><td>{subjects.join(", ")}</td></tr>
                <tr><td>Medium</td><td>{mediums.join(", ")}</td></tr>
                <tr><td>Style</td><td>{styles.join(", ")}</td></tr>
                <tr><td>Materials</td><td>{materials.join(", ")}</td></tr>
            </tbody>
        </table>
    )
    
    
    return (
        <div className="container">
            <div className="top-content">
                <div className="picture">
                    <img src={ imageUrl } className="img-fluid" alt="imageUrl" width="350" height="350"/>
                </div>
                <div className="right">
                    <div className="title">{ title }</div>
                    <div><span className="artistName">{ artistShort.fullname }</span><span className="country">{ artistShort.country }</span></div>
                    <div className="small">
                        <span>{ category }</span><span>{ creationYear }</span>
                        <div>{`${dimensions.width} W x ${dimensions.height}H x ${dimensions.depth} D in`}</div>
                    </div>
                    <div className="price">{ price} €</div>
                    <div className="button">
                        {status === "AVAILABLE" ? <button className="aquire">Acquire</button> : ""}
                        <button className="offer">Make an offer</button>
                    </div>
                </div>
            </div>
            <div className="bottom-content">
                <div className="description">
                    <CollapseComponent title="Description" content={ description }></CollapseComponent>
                </div>
                <div className="subject">
                    <CollapseComponent title="Subject, Medium, Style, Materials" content={ subjectContent(subjects, mediums, styles, materials) }></CollapseComponent>
                </div>
                <SlideComponent artWorkItems={artWorkItems}></SlideComponent>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const otherArtworkImages = R.pathOr([], ["data", "otherArtworkImages"], state)
    const imageItems = otherArtworkImages.map((imageUrl, i) => {
        return {
            src: imageUrl,
            key: i
        }
    });
    return {
        imageUrl: R.pathOr("", ["data", "imageUrl"], state),
        title: R.pathOr("", ["data", "title"], state),
        category: R.pathOr("", ["data", "category"], state),
        description: R.pathOr("", ["data", "description"], state),
        creationYear: R.pathOr("", ["data", "creationYear"], state),
        subjects: R.pathOr([], ["data", "subjects"], state),
        mediums: R.pathOr([], ["data", "mediums"], state),
        styles: R.pathOr([], ["data", "styles"], state),
        materials : R.pathOr([], ["data", "materials"], state),
        artistShort: R.pathOr([], ["data", "artistShort"], state),
        dimensions: R.pathOr([], ["data", "dimensions"], state),
        price: R.pathOr("", ["data", "price"], state),
        status: R.pathOr("", ["data", "status"], state),
        artWorkItems: imageItems
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (data) => dispatch(loadData(data)),
    }
}

const ArtWorkComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtWorkComponent)

export default ArtWorkComponentContainer;
