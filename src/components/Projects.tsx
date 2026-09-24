import { useState, type FC } from "react";
import { RxCross2 } from "react-icons/rx";

import { tags } from "@/data/tags";
import { projects } from "@/data/projects";

const Tag: FC<{
  tag: string;
  onClick: (tag: string) => void;
  isRemover?: boolean;
}> = ({ tag, onClick, isRemover }) => (
  <button
    onClick={() => onClick(tag)}
    className={`text-xs border border-ink px-2 p-0.5 flex gap-1 items-center whitespace-nowrap cursor-pointer ${isRemover ? "bg-ink text-paper" : "bg-paper hover:bg-ink hover:text-paper"}`}
  >
    <span>{tag}</span>
    {isRemover && <RxCross2 className="ml-1 inline-block bg-ink text-paper" />}
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
      <section className="flex gap-3 overflow-x-auto pb-2">
        {filteredProjects.map((project, i) => (
          <article
            key={i}
            className="min-w-[240px] w-[240px] sm:min-w-[300px] sm:w-[300px] border border-ink box-shadow p-3 flex flex-col gap-1.5"
          >
            <div className="flex items-baseline justify-between gap-x-3">
              <h1 className="font-serif font-bold">{project.name}</h1>
              <div className="flex gap-3 text-sm shrink-0">
                <a href={project.code} className="underline">
                  Source
                </a>
                {project.url && (
                  <a href={project.url} className="underline">
                    Site
                  </a>
                )}
              </div>
            </div>
            <p className="font-serif text-sm leading-snug grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag) => (
                <Tag key={tag} tag={tag} onClick={() => addTag(tag)} />
              ))}
            </div>
          </article>
        ))}
        {filteredProjects.length === 0 && <p>No matching projects</p>}
      </section>
    </section>
  );
}
