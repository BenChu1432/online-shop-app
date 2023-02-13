import React from 'react';

type Props={
    className?: string;
}

const SkeletonLoading = (props:Props) => {
    return (
        <div className={props.className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ width: '50%', height: '50px', borderRadius: '10px', backgroundColor: '#ccc' }} />
            <div style={{ marginTop: '20px', width: '80%', height: '20px', borderRadius: '10px', backgroundColor: '#ccc' }} />
        </div>
    );
};

export default SkeletonLoading;