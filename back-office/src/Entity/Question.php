<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


/**
 * Question
 *
 * @ORM\Table(
 *     name="question",
 *     indexes={
 *         @ORM\Index(name="question_type", columns={"type"}),
 *         @ORM\Index(name="question_difficulty", columns={"difficulty"}),
 *         @ORM\Index(name="question_custom_quiz_id", columns={"customQuizId"}),
 *         @ORM\Index(name="question_status", columns={"status"})})
 * @ORM\Entity(repositoryClass="App\Repository\QuestionRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Question extends EntityBase
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     * @ORM\SequenceGenerator(sequenceName="question_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=40, nullable=false)
     */
    private $type;

    /**
     * @var string|null
     *
     * @ORM\Column(name="difficulty", type="string", length=30, nullable=true)
     */
    private $difficulty;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text", nullable=false)
     */
    private $content;

    /**
     * @var json
     *
     * @ORM\Column(name="answer", type="json", nullable=false)
     */
    private $answer;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=30, nullable=false)
     */
    private $status;

    /**
     * @var json|null
     *
     * @ORM\Column(name="media", type="json", nullable=true)
     */
    private $media;

    /**
     * @var CustomQuiz
     *
     * @ORM\ManyToOne(targetEntity="CustomQuiz", inversedBy="questions")
     * @ORM\JoinColumn(name="`customQuizId`", referencedColumnName="id")
     */
    private $customQuiz;

    /**
     * @var Collection|Category[]
     *
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="questions")
     * @ORM\JoinTable(name="category_question",
     *     joinColumns={@ORM\JoinColumn(name="`questionId`", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="`categoryId`", referencedColumnName="id")}
     *     )
     */
    private $categories;

    /**
     * @var QuestionPosition
     *
     * @ORM\OneToOne(targetEntity="QuestionPosition", mappedBy="question")
     */
    private $position;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDifficulty(): ?string
    {
        return $this->difficulty;
    }

    public function setDifficulty(?string $difficulty): self
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getAnswer(): ?array
    {
        return $this->answer;
    }

    public function setAnswer(array $answer): self
    {
        $this->answer = $answer;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getMedia(): ?array
    {
        return $this->media;
    }

    public function setMedia(?array $media): self
    {
        $this->media = $media;

        return $this;
    }

    public function getCustomQuiz(): ?CustomQuiz
    {
        return $this->customQuiz;
    }

    public function setCustomQuiz(?CustomQuiz $customQuiz): self
    {
        $this->customQuiz = $customQuiz;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        $this->categories->removeElement($category);

        return $this;
    }

    public function getPosition(): ?QuestionPosition
    {
        return $this->position;
    }

    public function setPosition(?QuestionPosition $position): self
    {
        // unset the owning side of the relation if necessary
        if ($position === null && $this->position !== null) {
            $this->position->setQuestion(null);
        }

        // set the owning side of the relation if necessary
        if ($position !== null && $position->getQuestion() !== $this) {
            $position->setQuestion($this);
        }

        $this->position = $position;

        return $this;
    }

    public function __toString()
    {
        // TODO: Implement __toString() method.
        return $this->content.' - '.$this->type.' - '.$this->status;
    }
}
