import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from './navButtons.module.css';
import { SetStateAction } from "react";

type Props = {
    setCurrentSession: (value: SetStateAction<number>) => void,
    currenteSession: number
}

/**
 * Componente de navegação entre as seções da SAAE.
 * @returns {JSX.Element}
 */
export default function NavButoomsSaae ({setCurrentSession, currenteSession}:Props){
    return(
        <div className={styles.boxButtom}>
            <IoIosArrowBack 
                size={40}
                onClick={()=>{
                    setCurrentSession((prev)=> {
                    if(prev === 0){
                        return 7
                    }else{
                        return prev-1
                    }
                    });
                    window.scrollTo(0, 0);
                }}
            />
            <div className={styles.boxBtnNav}>
                <div 
                    onClick={()=>{
                        setCurrentSession(0);
                        window.scrollTo(0, 0);
                    }} 
                    style={{
                        border: currenteSession === 0 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 0 ? 'var(--verde)' : '',
                        color: currenteSession === 0 ? 'var(--dark)' : 'var(--white)'
                    }}>1</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(1);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 1 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 1 ? 'var(--verde)' : '',
                        color: currenteSession === 1 ? 'var(--dark)' : 'var(--white)'
                    }}>2</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(2);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 2 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 2 ? 'var(--verde)' : '',
                        color: currenteSession === 2 ? 'var(--dark)' : 'var(--white)'
                    }}
                >3</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(3);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 3 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 3 ? 'var(--verde)' : '',
                        color: currenteSession === 3 ? 'var(--dark)' : 'var(--white)'
                    }}
                >4</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(4);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 4 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 4 ? 'var(--verde)' : '',
                        color: currenteSession === 4 ? 'var(--dark)' : 'var(--white)'
                    }}
                >5</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(5);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 5 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 5 ? 'var(--verde)' : '',
                        color: currenteSession === 5 ? 'var(--dark)' : 'var(--white)'
                    }}
                >6</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(6);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 6 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 6 ? 'var(--verde)' : '',
                        color: currenteSession === 6 ? 'var(--dark)' : 'var(--white)'
                    }}
                >7</div>
                <div 
                    onClick={()=>{
                        setCurrentSession(7);
                        window.scrollTo(0, 0);
                    }}
                    style={{
                        border: currenteSession === 7 ? '2px solid var(--dark)' : '',
                        backgroundColor: currenteSession === 7 ? 'var(--verde)' : '',
                        color: currenteSession === 7 ? 'var(--dark)' : 'var(--white)'
                    }}
                >R</div>
            </div>
            <IoIosArrowForward 
                size={40}
                onClick={()=>{setCurrentSession((prev)=> {
                    if(prev === 7){
                        return 0
                    }else{
                        return prev+1
                    }
                    });
                    window.scrollTo(0, 0);
                }}
            />                    
        </div>
    )
}