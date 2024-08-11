import React, {
    ChangeEvent,
    useState,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import { ICreateGroupReq } from '../_types/type';
import { Label } from '@/components/atoms';

interface FieldTagFactoryProps {
    postMetaInput: ICreateGroupReq;
    setPostMetaInput: Dispatch<SetStateAction<ICreateGroupReq>>;
    disabled?: boolean;
}

const FieldTagFactory: React.FC<FieldTagFactoryProps> = ({
    postMetaInput,
    setPostMetaInput,
    disabled = false,
}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const onChange = (e: ChangeEvent<any>) => {
        if (!disabled) setInputValue(e.target.value);
    };

    const onKeyDownTagRegisterDelete = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (disabled) return;

        if (e.key === 'Enter' && inputValue.trim()) {
            setPostMetaInput({
                ...postMetaInput,
                tags: postMetaInput?.tags
                    ? [...postMetaInput.tags, inputValue]
                    : [inputValue],
            });

            setInputValue('');
        }

        if (e.key === 'Backspace' && inputValue === '') {
            setPostMetaInput({
                ...postMetaInput,
                tags: postMetaInput?.tags?.slice(
                    0,
                    postMetaInput.tags.length - 1,
                ),
            });
        }
    };

    const handleTagDelete = (idx: number) => {
        if (disabled) return;

        setPostMetaInput({
            ...postMetaInput,
            tags: postMetaInput?.tags?.filter((tag, i) => i !== idx),
        });
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [postMetaInput.tags]);

    return (
        <div className="flex flex-col gap-2 w-auto">
            <Label htmlFor="">태그</Label>

            <div
                ref={scrollRef}
                className="flex flex-row justify-start h-11 w-full border-2px border-white rounded-md bg-dr-indigo-100 font-normal overflow-x-hidden white-space-nowrap"
            >
                <div className="TagArea ml-3 mr-1 flex flex-row gap-2">
                    {postMetaInput?.tags?.map((tag, idx) => (
                        <TagChip
                            key={idx}
                            id={idx}
                            handleTagDelete={handleTagDelete}
                        >
                            {tag}
                        </TagChip>
                    ))}
                </div>
                <input
                    className={`h-full w-full min-w-[40%] border-2px border-white rounded-md bg-dr-indigo-100 font-normal outline-none text-left text-xs ${disabled ? 'bg-dr-indigo-300' : ''}`}
                    onChange={onChange}
                    onKeyDown={onKeyDownTagRegisterDelete}
                    value={inputValue}
                    placeholder={
                        disabled
                            ? ''
                            : '태그를 입력하고 엔터 (ex. SF소설, python, ...)'
                    }
                    name="tags"
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

const TagChip = ({
    id,
    children,
    handleTagDelete,
}: {
    id: number;
    children: any;
    handleTagDelete: (idx: number) => void;
}) => {
    return (
        <button
            className="h-full inline-flex items-center animate-popIn"
            onClick={() => handleTagDelete(id)}
            disabled={handleTagDelete === undefined}
        >
            <span className="inline-flex items-center !text-xs whitespace-nowrap bg-dr-gray-500 font-normal dark:bg-[#1E1E1E] text-dr-coral-100 dark:text-secondary h-3/5 my-2 px-3 rounded-full transition-all duration-100">
                {children}
            </span>
        </button>
    );
};

export default FieldTagFactory;
