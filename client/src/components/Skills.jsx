import React, { useState, useEffect } from 'react';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
            .then(res => res.json())
            .then(data => {
                if (data.skills) setSkills(data.skills);
            })
            .catch(err => console.error("Failed to fetch skills", err));
    }, []);

    return (
        <section id="skills" className="skills-section section">
            <div className="container">
                <div className="section-header reveal active">
                    <h2>Technical <span>Skills</span></h2>
                </div>
                <div className="skills-grid">
                    {skills.map(skill => (
                        <div className="skill-card reveal active" key={skill.id}>
                            <i className={skill.icon} style={{ color: skill.color }}></i>
                            <h3>{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
