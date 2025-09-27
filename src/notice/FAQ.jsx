/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from '../components/header';
import '../assets/styles/common.css';
import './FAQ.css';
import festaLogo from "/images/festaLogo.png";
import qna from '/icons/qna.png';
import qnaOpen from '/icons/qnaOpen.png';
import qnaClose from '/icons/qnaClose.png';
import answer from '/icons/answer.png';

export default function FAQ() {
    const faqData = [
        {
            category: "무대",
            items: [
                { q: "무대 입장은 몇 시부터 가능한가요?", a: "14:40부터 대기 줄에 선 순서대로 입장 가능합니다. 재학생과 외부인 모두 입장할 수 있습니다." },
                { q: "누구나 참여 가능한가요? 재학생/졸업생/외부인 제한이 있나요?", a: "누구나 즐길 수 있습니다! 다만, 선물이나 일부 혜택은 재학생/학생회비 납부자에게만 제공될 수 있습니다." },
                { q: "이번 축제에 특별한 이벤트가 있나요?", a: "네! 여러분이 직접 작성한 대학 관련 사연 낭독 코너, 우리 학교 대표 가창자들이 참여하는 SU퍼스타, MC 섭이가 진행하는 소개팅 레크레이션 시간 등 다양한 이벤트가 준비되어 있습니다." },
                { q: "재학생존 수용 가능 인원은 몇 명인가요?", a: "단위 면적당 최대 4,000명까지 수용 가능합니다. 안전을 위해 재학생존 인원을 제한하며, 유동적 인원을 고려해 실시간 인원 카운팅을 통해 운영합니다." },
                { q: "재학생 팔찌 배부는 언제부터인가요?", a: "오전 10시부터 잔디밭 인근 운영본부에서 배부하며, 소진 시 종료됩니다." }
            ]
        },
        {
            category: "굿즈/분실물",
            items: [
                { q: "분실물은 어디서 찾아야 하나요?", a: "잔디밭 취식존에 총학생회 분실물 수령 부스에서 가능합니다." }
            ]
        },
        {
            category: "부스",
            items: [
                { q: "부스는 어떤 종류가 있나요?", a: "총학생회, 일반학과, 개인, 동아리 등 다양한 참여자들이 먹거리, 공예체험 등의 부스를 준비하였습니다! 자세한 부스의 내용은 웹페이지에서 확인 가능합니다!" },
                { q: "취식존이 준비되어 있나요?", a: "네! 도서관과 에스라관 사이 샌드위치길 잔디밭에 취식존이 준비되어 있습니다! 피크닉을 위한 돗자리부터 물티슈, 종이컵 등 여러분이 편리하게 음식을 드시며 즐거운 시간 보내시도록 준비해 두었습니다!" },
                { q: "배달음식 섭취가 가능한가요?", a: "네! 취식존 바로 뒤 배달존이 마련되어 있습니다. 배달존이 교내에 위치하고, 취식존과 바로 연결되어 있어 보다 편리하게 음식을 배달시켜 드실 수 있습니다!" },
                { q: "비가 오면 야외 프로그램은 어떻게 진행되나요?", a: "적은 양의 비가 내릴 시 프로그램은 정상 진행됩니다. 다만, 많은 양의 비가 오게 될 경우 프로그램이 잠시 중단될 수 있습니다." }
            ]
        },
        {
            category: "안전",
            items: [
                { q: "안전사고나 돌발상황이 발생했을 시에 어떻게 해야 하나요?", a: "안전사고 발생 시 주변의 하얀색 바람막이를 입은 축제 운영 스태프들에게 상황을 전달해 주시면 신속히 도움 드리도록 하겠습니다!" }
            ]
        }
    ];

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

    const handleCategoryClick = (idx) => {
        setSelectedCategoryIndex(idx);
        setOpenQuestionIndex(null);
    };

    const toggleQuestion = (idx) => {
        setOpenQuestionIndex((prev) => (prev === idx ? null : idx)); // 하나만 열림
    };

    const currentCategory = faqData[selectedCategoryIndex];
    const items = currentCategory?.items ?? [];

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">
                <img src={festaLogo} alt="" />
            </div>
            <div id="FAQ" className="MyPageAlways">
                <Header />
                <div className="FAQ">
                    <div className="FAQ-Top">FAQ</div>
                    <span className="FAQ-Top-text">
                        천보축전에 대해 자주 묻는 질문들을 모았어요!
                    </span>
                    <hr
                        style={{
                            border: "none",
                            height: "2px",
                            backgroundColor: "#E9EBED",
                            margin: 0,
                            width: "90%"
                        }}
                    />

                    <div className="FAQ-Categories">
                        {faqData.map((cat, idx) => (
                            <button
                                key={cat.category}
                                className={`FAQ-CategoryTab ${selectedCategoryIndex === idx ? 'is-selected' : ''}`}
                                onClick={() => handleCategoryClick(idx)}
                            >
                                {cat.category}
                            </button>
                        ))}
                    </div>

                    <div className="FAQ-Box">
                        <div className="FAQ-section">
                            {items.map((faq, i) => (
                                <div key={`${currentCategory.category}-${i}`} className="FAQ-itemGroup">
                                    <div
                                        className="FAQ-question"
                                        onClick={() => toggleQuestion(i)}
                                    >
                                        <img src={qna} alt="qna" className="qna-first-img" />
                                        <span className="q-contents">{faq.q}</span>
                                        <img
                                            src={openQuestionIndex === i ? qnaOpen : qnaClose}
                                            alt={openQuestionIndex === i ? "닫기" : "열기"}
                                            className="qna-open-icon"
                                        />
                                    </div>
                                    <div className="q-category">{currentCategory.category}</div>

                                    {openQuestionIndex === i && (
                                        <div className="FAQ-answer">
                                            <img src={answer} alt="answer" className="answer-icon" />
                                            <span className="a-contents">{faq.a}</span>
                                        </div>
                                    )}

                                    {i !== items.length - 1 && (
                                        <hr
                                            style={{
                                                border: "none",
                                                height: "2px",
                                                backgroundColor: "#E9EBED",
                                                margin: 0,
                                                width: "100%"
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="ResponsiveScreen2">
                <div className='ResponsiveScreen2-div'>
                    <span id=''>
                        20<br />
                        25
                    </span>
                    <span>
                        SAHMYOOK<br />
                        UNIVERSITY<br />
                        FESTIVAL
                    </span>
                </div>
            </div>
        </div>
    );
}
