import React, { useEffect, useState } from 'react';
import AllTitle from '../../Hooks/AllTitle';
import Doctor from './Doctor/Doctor';
import DoctorBanner from './DoctorBanner/DoctorBanner';
import circleImg from '../../assets/loading-circle.gif'
import { Link } from 'react-router-dom';
import DoctorBookingForm from './DoctorBookingForm/DoctorBookingForm';

const Doctors = () => {
    AllTitle('Doctors')
    const [doctors, setDoctors] = useState([]);
    const [loader, setLoader] = useState(false);
    const [anotherLoader, setAnotherLoader] = useState({});

    useEffect(() => {
        setLoader(true);
        fetch('https://promise-hospoital-server-jahid900pj.vercel.app/docInfo')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                setLoader(false)




            })
    }, [])

    const [loading, setLoading] = useState(false);

    const checkLoader = () => {
        setLoading(true);

    }
    return (
        <>
            <DoctorBanner doctors={doctors}></DoctorBanner>
            <div className='flex justify-center my-8'>{loader ? <img src={circleImg} className="w-16" alt='' /> : ''}</div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 md:w-11/12 w-10/12 mx-auto mb-10'>

                {
                    doctors.map(doctor => <Doctor key={doctor._id} doctor={doctor} setAnotherLoader={setAnotherLoader} checkLoader={checkLoader}></Doctor>)
                }

            </div>

            <div>
                {
                    anotherLoader &&
                    <DoctorBookingForm key={anotherLoader._id} anotherLoader={anotherLoader}></DoctorBookingForm>
                }
            </div>

        </>
    );
};

export default Doctors;