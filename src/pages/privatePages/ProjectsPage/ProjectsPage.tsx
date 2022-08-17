import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectItem from "../../../components/ProjectItem/ProjectItem";
import SortingTypes from "../../../components/SortingTypes/SortingTypes";
import { selectUser } from "../../../store/Slices/userSlice";
import { sortArray } from "../../../utils/sortArray";

const sortingTypes = [
    { value: "timeAsc", title: "sort newest to oldest", id: 1 },
    { value: "timeDesc", title: "sort oldest to newest", id: 2 },
    { value: "title", title: "sort by title", id: 3 },
];

const ProjectsPage = () => {
    const { currentUser } = useSelector(selectUser);
    const [sortingValue, setSortingValue] = useState(sortingTypes[0].value);

    return (
        <>
            <Link to="./new">+ add new</Link>

            <SortingTypes
                sortingTypes={sortingTypes}
                sortingValue={sortingValue}
                setSortingValue={setSortingValue}
            />

            <div style={{ display: "flex" }}>
                {currentUser &&
                    sortArray({
                        arr: currentUser.projects,
                        sortType: sortingValue,
                    }).map((i) => (
                        <ProjectItem
                            key={i.id}
                            title={i.title}
                            description={i.description}
                            totalTime={i.totalTime}
                            slug={i.slug}
                            id={i.id}
                            currentUser={currentUser}
                        />
                    ))}
            </div>
        </>
    );
};

export default ProjectsPage;
