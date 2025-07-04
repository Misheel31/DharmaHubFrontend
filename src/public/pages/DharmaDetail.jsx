import { Link, useParams } from "react-router-dom";
import Header from "../../components/Navbar";

import Buddha1 from "../../assets/Buddha1.png";
import NobleTruth from "../../assets/NobleTruth.png";
import Eightfold from "../../assets/eightfold.png";

const dharmaTopics = [
  {
    title: "Introduction to Buddhism",
    image: Buddha1,
    content: `Buddhism is a spiritual tradition founded by Siddhartha Gautama, known as the Buddha, in the 6th century BCE. It emphasizes the path to enlightenment through practices like meditation, ethical conduct, and wisdom. The core teachings include the Four Noble Truths and the Eightfold Path. It encourages followers to develop mindfulness, compassion, and inner peace.

At its heart, Buddhism seeks to understand the nature of suffering and how to overcome it. The practice of mindfulness (sati) and meditation (bhavana) is central to personal growth and inner clarity. Over centuries, Buddhism has spread across Asia and globally, adapting culturally but holding fast to its principles of compassion, non-attachment, and the pursuit of wisdom.

Whether one follows Theravāda, Mahāyāna, or Vajrayāna traditions, the essence remains focused on reducing suffering and achieving spiritual awakening through ethical living and deep insight.`,
  },
  {
    title: "Understanding the Four Noble Truths",
    image: NobleTruth,
    content: `The Four Noble Truths form the foundation of Buddhist philosophy:
1. Dukkha – Life involves suffering.
2. Samudaya – Suffering is caused by craving and attachment.
3. Nirodha – Suffering can end through letting go of craving.
4. Magga – The Eightfold Path leads to the end of suffering.

These truths offer a roadmap to liberation and spiritual awakening. Dukkha is not just pain, but the general dissatisfaction with life. Recognizing it is the first step toward transformation. Samudaya identifies desire, aversion, and ignorance as roots of suffering.

Nirodha teaches that liberation is possible — that suffering is not eternal. And Magga, the path, provides a practical guide for ethical conduct, mental discipline, and wisdom. These truths are not dogma but experiential principles to be realized through practice and reflection.`,
  },
  {
    title: "The Eightfold Path Explained",
    image: Eightfold,
    content: `The Eightfold Path is a practical guide to ethical and mental development with the goal of freeing individuals from suffering:
1. Right View
2. Right Intention
3. Right Speech
4. Right Action
5. Right Livelihood
6. Right Effort
7. Right Mindfulness
8. Right Concentration

This path is divided into three core categories: Wisdom (Right View, Right Intention), Ethical Conduct (Right Speech, Action, Livelihood), and Mental Discipline (Right Effort, Mindfulness, Concentration). Practicing these helps one purify the mind, live harmoniously, and move toward enlightenment.

It's not a sequential path but a holistic one — all eight aspects support each other. Through continuous cultivation, the Eightfold Path leads to insight, peace, and ultimate freedom from samsara — the cycle of rebirth.`,
  },
];

const DharmaDetail = () => {
  const { topicId } = useParams();
  const topic = dharmaTopics[topicId];

  if (!topic) {
    return (
      <div className="text-center p-10 text-red-600 text-xl">
        Topic not found.
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* <div className="min-h-screen bg-gradient-to-br from-[#F9E6E6] to-[#F5EDED] py-16 px-6 sm:px-12"> */}
      <div className="bg-[#F9EEEE] shadow-md rounded-3xl w-full min-h-screen mx-auto overflow-hidden flex flex-col-reverse lg:flex-row items-start gap-10 p-10">
        {/* Text Content */}
        <div className="lg:w-2/3 h-full">
          <h1 className="text-4xl font-bold text-[#BB5288] mb-4 mt-12">
            {topic.title}
          </h1>
          <p className="text-gray-800 text-lg whitespace-pre-line leading-7">
            {topic.content}
          </p>
          <Link
            to="/learnthedharma"
            className="mt-6 inline-block text-white bg-[#BB5288] hover:bg-[#9c4070] px-5 py-2 rounded-full transition-all duration-200"
          >
            ← Back to Dharma Topics
          </Link>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 h-full flex items-center justify-center mt-20">
          <img
            src={topic.image}
            alt={topic.title}
            className="w-full h-full object-cover rounded-xl border border-[#eccedf] shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DharmaDetail;
