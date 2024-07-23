'use client';
import React from 'react';
import { Button } from '@/components/atoms';

const Example = () => {
    return (
        <div className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">버튼 예시</h1>

            {/* 기본 버튼 */}
            <div>
                <h2 className="font-semibold">기본 버튼</h2>
                <Button onClick={() => alert('클릭되었습니다!')}>
                    클릭하세요
                </Button>
            </div>

            {/* 윤곽선이 있는 버튼 */}
            <div>
                <h2 className="font-semibold">윤곽선 버튼</h2>
                <Button
                    outlined
                    onClick={() => alert('윤곽선 버튼이 클릭되었습니다!')}
                >
                    윤곽선 버튼
                </Button>
            </div>

            {/* 전체 폭 버튼 */}
            <div>
                <h2 className="font-semibold">전체 폭 버튼</h2>
                <Button
                    fullWidth
                    onClick={() => alert('전체 폭 버튼이 클릭되었습니다!')}
                >
                    전체 폭 버튼
                </Button>
            </div>

            {/* 둥근 버튼 */}
            <div>
                <h2 className="font-semibold">둥근 버튼</h2>
                <Button
                    rounded
                    onClick={() => alert('둥근 버튼이 클릭되었습니다!')}
                >
                    둥근 버튼
                </Button>
            </div>

            {/* 색상이 있는 버튼 */}
            <div>
                <h2 className="font-semibold">색상 버튼</h2>
                <Button
                    color="coral"
                    onClick={() => alert('코랄 버튼이 클릭되었습니다!')}
                >
                    코랄
                </Button>
                <Button
                    color="dark"
                    onClick={() => alert('다크 버튼이 클릭되었습니다!')}
                >
                    다크
                </Button>
                <Button
                    color="red"
                    onClick={() => alert('레드 버튼이 클릭되었습니다!')}
                >
                    레드
                </Button>
            </div>

            {/* 비활성화된 버튼 */}
            <div>
                <h2 className="font-semibold">비활성화된 버튼</h2>
                <Button disabled>비활성화 버튼</Button>
            </div>

            {/* 사이즈에 따른 버튼 */}
            <div>
                <h2 className="font-semibold">사이즈별 버튼</h2>
                <Button
                    size="sm"
                    onClick={() => alert('작은 버튼이 클릭되었습니다!')}
                >
                    작은 사이즈
                </Button>
                <Button
                    size="md"
                    onClick={() => alert('중간 버튼이 클릭되었습니다!')}
                >
                    중간 사이즈
                </Button>
                <Button
                    size="lg"
                    onClick={() => alert('큰 버튼이 클릭되었습니다!')}
                >
                    큰 사이즈
                </Button>
            </div>
        </div>
    );
};

export default Example;
