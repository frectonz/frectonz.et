import { useState, type FC } from "react";
import { RxCross2 } from "react-icons/rx/index";

import { tags } from "../data/tags";
import { projects } from "../data/projects";

const Tag: FC<{
  tag: string;
  onClick: (tag: string) => void;
  isRemover?: boolean;
}> = ({ tag, onClick, isRemover }) => (
  <button
    onClick={() => onClick(tag)}
    className={`border border-black px-2 p-0.5 flex gap-1 items-center whitespace-nowrap ${isRemover ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
  >
    <span>{tag}</span>
    {isRemover && (
      <RxCross2 className="ml-1 inline-block bg-black text-white" />
    )}
  </button>
);

export default function Projects() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const otherTags = Object.values(tags).filter(
    (tag) => !selectedTags.includes(tag),
  );

  const filteredProjects = projects.filter(
    (project) =>
      selectedTags.length === 0 ||
      selectedTags.every((tag) => project.tags.includes(tag)),
  );

  return (
    <section className="mb-5">
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {selectedTags.map((tag) => (
          <Tag key={tag} tag={tag} isRemover onClick={() => removeTag(tag)} />
        ))}
        {otherTags.map((tag) => (
          <Tag key={tag} tag={tag} onClick={() => addTag(tag)} />
        ))}
      </div>
      <section className="flex gap-5 overflow-x-auto pb-2">
        {filteredProjects.map((project, i) => (
          <article
            key={i}
            className="min-w-[280px] w-[280px] sm:min-w-[400px] sm:w-[400px] min-h-[350px] border border-black box-shadow flex flex-col"
          >
            <header className="p-4 border-black">
              <h1 className="font-serif text-xl font-bold">{project.name}</h1>
            </header>

            <div className="p-4 border-y border-black flex gap-2 overflow-x-scroll">
              {project.tags.map((tag) => (
                <Tag key={tag} tag={tag} onClick={() => addTag(tag)} />
              ))}
            </div>

            <div className="p-4 flex-grow">
              <p>{project.description}</p>
            </div>
            <footer className="px-4 pb-4 flex gap-4 justify-end">
              <a href={project.code} className="underline">
                Source
              </a>
              {project.url && (
                <a href={project.url} className="underline">
                  View Project
                </a>
              )}
            </footer>
          </article>
        ))}
        {filteredProjects.length === 0 && <p>No matching projects</p>}
      </section>
    </section>
  );
}
