import React from 'react';

const Experience = () => {
    const experiences = [
        {
            id: 1,
            company: "Nexa Infotech",
            position: "Full Stack Intern",
            duration: "2025 - 2026",
            totalDuration: "6 Months",
            subExperiences: [
                {
                    title: "Node.js Development",
                    duration: "3 Months",
                    description: "Developed RESTful APIs using Node.js and Express. Mastered database management with MongoDB and implemented authentication systems."
                },
                {
                    title: "Django Development",
                    duration: "3 Months",
                    description: "Built backend services using Python/Django. Gained experience in SSR and database migrations."
                }
            ]
        }
    ];

    return (
        <section id="experience" className="experience-section section">
            <div className="container">
                <div className="section-header reveal reveal-zoom active">
                    <h2>Professional <span>Experience</span></h2>
                </div>
                <div className="timeline">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="timeline-item reveal reveal-left active">
                            <div className="timeline-dot"></div>
                            <div className="timeline-date">{exp.duration}</div>
                            <div className="timeline-content">
                                <h3>{exp.company}</h3>
                                <h4>{exp.position} ({exp.totalDuration})</h4>

                                {exp.subExperiences?.map((subExp, index) => (
                                    <div key={index} className="experience-subgroup">
                                        <h5>{subExp.title} ({subExp.duration})</h5>
                                        <p>{subExp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
