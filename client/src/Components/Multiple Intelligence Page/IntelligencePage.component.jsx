import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { ProgressContext } from '../../context/progress.context';
import './Intelligence.styles.css';
import mipimg from '../../assets/Mip.svg';
import Spinner from '../Spinner/Spinner';

const IntelligencePage = () => {
    // const { setVisitedPages } = useContext(ProgressContext);
    const navigate = useNavigate();

    const [mipScore, setMipScore] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setVisitedPages(() => ({
    //         OLevelPage: true,
    //         ALevelPage: true,
    //         extraCurricular: true,
    //         option: true,
    //         home: true,
    //         assessment: true,
    //         CalculatingPage: true,
    //         IntelligencePage: true,
    //     }));
    // }, [setVisitedPages]);

    useEffect(() => {
        setLoading(true);
        const storedData = localStorage.getItem("intelligenceObject");
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    setMipScore(parsedData);
                }
            } catch (error) {
                console.error("Error parsing intelligenceObject from localStorage", error);
            }
        }
        setLoading(false);
    }, []);

    const IdentifyIntelligence = (value) => {
        const intelligenceTypes = {
            1: 'Logical-Mathematical',
            2: 'Linguistic',
            3: 'Spatial',
            4: 'Musical',
            5: 'Bodily-Kinesthetic',
            6: 'Interpersonal',
            7: 'Intrapersonal',
            8: 'Naturalistic',
            9: 'Existential'
        };
        return intelligenceTypes[value] || 'Unknown';
    };

    const getIconForIntelligence = (type) => {
        const icons = {
            'Logical-Mathematical': '🧮',
            'Linguistic': '📚',
            'Spatial': '🖼️',
            'Musical': '🎵',
            'Bodily-Kinesthetic': '🏀',
            'Interpersonal': '👥',
            'Intrapersonal': '🧘',
            'Naturalistic': '🌿',
            'Existential': '🌌'
        };
        return icons[type] || '❓';
    };

    const goToTestPage = () => {
        navigate("/Assesment");
    };

    const careerSelectionBtnHandler = () => {
        navigate("/Careers");
    };

    if (loading) {
        return (
            <div className=''>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="intelligence-page-wrapper">
            <div className="intelligence-header-container">
                <div className="intelligence-header">
                    <h1>Here is your Multiple Intelligence Profile</h1>
                    <p>Discover the unique strengths of your intellectual landscape</p>
                </div>
                <div>
                    <img alt="Multiple Image -profile" className='mip-img' src={mipimg} />
                </div>
                <div className="intelligence-actions intelligence-actions1">
                    <button className="btn btn-secondary" onClick={goToTestPage}>
                        Retake Test
                    </button>
                    <button className="btn btn-primary" onClick={careerSelectionBtnHandler}>
                        Explore Careers
                    </button>
                </div>
            </div>

            <div className="intelligence-page-container">
                <div className="intelligence-grid">
                    {mipScore.length > 0 ? (
                        mipScore.map((intelligence, index) => {
                            const intelligenceType = IdentifyIntelligence(Number(intelligence[0]));
                            const percentage = intelligence[1].intelligence_percentage.toFixed(0);
                            const icon = getIconForIntelligence(intelligenceType);

                            return (
                                <div key={index} className="intelligence-card">
                                    <div className="intelligence-card-icon">{icon}</div>
                                    <div className="intelligence-card-content">
                                        <h3>{intelligenceType}</h3>
                                        <div className="percentage-bar">
                                            <div className="percentage-fill" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                        <span className="percentage-text">{percentage}%</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="no-score-msg">No MIP score data found. Please retake the test.</p>
                    )}
                </div>
            </div>

            <div className="intelligence-actions intelligence-actions2">
                    <button className="btn btn-secondary" onClick={goToTestPage}>
                        Retake Test
                    </button>
                    <button className="btn btn-primary" onClick={careerSelectionBtnHandler}>
                        Explore Careers
                    </button>
                </div>
        </div>
    );
};

export default IntelligencePage;
