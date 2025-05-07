import { useRouter } from "next/router";

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query} = router;

    const handleLanguageChange= (event: {target: { value: string } }) => {
        const newLocale = event.target.value;
        const {pathname,asPath,query} = router;
        router.push({pathname, query}, asPath, {locale: newLocale});
    };

    return (
        
            <select id="language" className="p-1 bg-gray-400 text-white" value={locale} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="nl">Dutch</option>
            </select>
        
    );
};

export default Language