import Header from "../../components/Navbar";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F9EEEE] pt-32 px-6 pb-20 flex flex-col items-center text-gray-800">
        <div className="max-w-5xl w-full text-center space-y-10">
          {/* Main Heading */}
          <h1 className="text-5xl font-bold text-[#9c4221]">
            About Dharma Hub
          </h1>

          {/* Introduction */}
          <p className="text-lg leading-relaxed">
            Dharma Hub is a sanctuary for seekers, readers, and practitioners of
            mindfulness, wisdom, and compassion. Our platform was born from the
            desire to make sacred teachings and peaceful content accessible in
            the digital age — blending ancient insight with modern technology.
          </p>

          {/* Our Mission */}
          <section>
            <h2 className="text-3xl font-semibold text-[#7c2d12] mb-3">
              Our Mission
            </h2>
            <p className="text-md text-gray-800 leading-relaxed max-w-4xl mx-auto">
              Our mission is to cultivate a digital home where people from all
              walks of life can access Buddhist texts, audio chants,
              reflections, and mindful practices. We are here to support your
              spiritual path — with clarity, integrity, and simplicity.
            </p>
          </section>

          {/* Our Journey */}
          <section>
            <h2 className="text-3xl font-semibold text-[#7c2d12] mb-3">
              Our Journey
            </h2>
            <p className="text-md text-gray-800 leading-relaxed max-w-4xl mx-auto">
              Dharma Hub began as a small idea among friends — one that
              recognized how difficult it can be to find well-organized,
              respectful, and meaningful spiritual resources online. Inspired by
              the teachings of Thich Nhat Hanh, the Dalai Lama, and the heart of
              the Buddha's wisdom, we began building a home for teachings that
              inspire peace and transformation.
            </p>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="text-3xl font-semibold text-[#7c2d12] mb-3">
              Our Core Values
            </h2>
            <ul className="list-disc list-inside text-left max-w-3xl mx-auto text-gray-800 space-y-2 text-md">
              <li>
                <strong>Mindfulness:</strong> Present, purposeful design in
                every element we build.
              </li>
              <li>
                <strong>Compassion:</strong> Putting the well-being of others at
                the center of our actions.
              </li>
              <li>
                <strong>Simplicity:</strong> Clean, clutter-free experiences
                focused on what matters most.
              </li>
              <li>
                <strong>Accessibility:</strong> Knowledge should be free and
                open to all, regardless of background or belief.
              </li>
              <li>
                <strong>Authenticity:</strong> Respecting the origins and depth
                of the teachings we share.
              </li>
            </ul>
          </section>

          {/* Community Vision */}
          <section>
            <h2 className="text-3xl font-semibold text-[#7c2d12] mb-3">
              Looking Ahead
            </h2>
            <p className="text-md text-gray-800 leading-relaxed max-w-4xl mx-auto">
              We envision Dharma Hub evolving into a growing community — a space
              for collaboration, learning, and shared awakening. As we continue
              building features like guided meditations, community reflections,
              and personal libraries, we invite you to walk this path with us.
            </p>
          </section>

          {/* Footer */}
          <footer className="mt-20 text-sm text-gray-600">
            © {new Date().getFullYear()} Dharma Hub. Built with love and
            intention.
          </footer>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
