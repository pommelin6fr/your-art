import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as R from "ramda";
import { connect } from "react-redux";
import { loadData } from "../actions";
import CollapseComponent from "./collapse";
import SlideComponentContainer from "./slides";


const ArtWorkComponent = ({ 
    loadData, 
    imageUrl,
    title,
    category,
    description,
    creationYear,
    price,
    subjects,
    mediums,
    styles,
    materials
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

    const subjectContent = (subjects, mediums, styles, materials) => {
        return (<table><tbody>
            <tr><td>Suject</td><td>{subjects.join(", ")}</td></tr>
            <tr><td>Medium</td><td>{mediums.join(", ")}</td></tr>
            <tr><td>Style</td><td>{styles.join(", ")}</td></tr>
            <tr><td>Materials</td><td>{materials.join(", ")}</td></tr>
            </tbody>
        </table>)
    }
    
    return (
        <div className="container">
            <div className="top-content">
                <div className="picture">
                    <img src={ imageUrl } className="img-fluid" alt="imageUrl" width="500" height="300"/>
                </div>
                <div className=""></div>
                <div className="description">
                    <CollapseComponent title="Description" content={ description }></CollapseComponent>
                </div>
                <div className="subject">
                    <CollapseComponent title="Suject, Medium, Style, Materials" content={ subjectContent(subjects, mediums, styles, materials) }></CollapseComponent>
                </div>
            </div>
            <div className="bottom-content">
                <SlideComponentContainer></SlideComponentContainer>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        imageUrl: R.pathOr("", ["data", "imageUrl"], state),
        title: R.pathOr("", ["data", "title"], state),
        category: R.pathOr("", ["data", "category"], state),
        description: R.pathOr("", ["data", "description"], state),
        creationYear: R.pathOr("", ["data", "creationYear"], state),
        price: R.pathOr("", ["data", "price"], state),
        subjects: R.pathOr([], ["data", "subjects"], state),
        mediums: R.pathOr([], ["data", "mediums"], state),
        styles: R.pathOr([], ["data", "styles"], state),
        materials : R.pathOr([], ["data", "materials"], state),
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