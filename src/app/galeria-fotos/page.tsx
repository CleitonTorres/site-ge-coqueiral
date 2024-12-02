import Section from '@/components/layout/sections/section';
import InstagramFeed from '@/components/layout/feeds/feeds';

export default function Page(){
    return(
        <Section customClass={['colorGrennDark', 'fullWidth', 'margin0']}>
            <InstagramFeed customClass={['textWhite']}/>
        </Section>
    )
}