import "bootstrap/dist/css/bootstrap.min.css";
import EnrollmentsA from "./components/EnrollmentsA/EnrollmentsA";
import EnrollmentsB from "./components/EnrollmentsB/EnrollmentsB";
import EnrollmentsC from "./components/EnrollmentsC/EnrollmentsC";
import EnrollmentsD from "./components/EnrollmentsD/EnrollmentsD";
import EnrollmentsE from "./components/EnrollmentsE/EnrollmentsE";
import EnrollmentsF from "./components/EnrollmentsF/EnrollmentsF";
import EnrollmentsG from "./components/EnrollmentsG/EnrollmentsG";
import EnrollmentsH from "./components/EnrollmentsH/EnrollmentsH";

function App() {
    const names = ["Dada", "Basil", "Vee", "Khaled"];
    const courses = ["React.js", "Vue.js", "Svelte", "Angular"];
    const ages = [18, 19, 20, 21];
    const students = [
        {
            name: "Dada",
            course: "React.js",
            age: 18,
        },
        {
            name: "Basil",
            course: "Vue.js",
            age: 19,
        },
        {
            name: "Vee",
            course: "Svelte",
            age: 20,
        },
        {
            name: "Khaled",
            course: "Angular",
            age: 21,
        },
    ];

    return (
        <>
            <div className="m-4">
                {/* <EnrollmentsA />
                <EnrollmentsB />
                <EnrollmentsC />
                <EnrollmentsD />
                <EnrollmentsE names={names} courses={courses} ages={ages} />
                <EnrollmentsF names={names} courses={courses} ages={ages} />
                <EnrollmentsG students={students} /> */}
                <EnrollmentsH students={students} />
            </div>
        </>
    );
}

export default App;
