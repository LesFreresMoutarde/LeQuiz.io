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
 *         @ORM\Index(name="question_is_hardcore", columns={"isHardcore"}),
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
     * @var bool
     *
     * @ORM\Column(name="`isHardcore`", type="boolean", nullable=false)
     */
    private $isHardcore;

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
     * @var QuestionType[]
     *
     * @ORM\ManyToMany(targetEntity="QuestionType", inversedBy="questions")
     * @ORM\JoinTable(name="question_type_question",
     *     joinColumns={@ORM\JoinColumn(name="`questionId`", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="`questionTypeId`", referencedColumnName="id")}
     *     )
     */
    private $types;

    /**
     * @var QuestionPosition
     *
     * @ORM\OneToOne(targetEntity="QuestionPosition", mappedBy="question")
     */
    private $position;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->types = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getIsHardcore(): ?bool
    {
        return $this->isHardcore;
    }

    public function setIsHardcore(bool $isHardcore): self
    {
        $this->isHardcore = $isHardcore;

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

    /**
     * @return Collection|QuestionType[]
     */
    public function getTypes(): Collection
    {
        return $this->types;
    }

    public function addType(QuestionType $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types[] = $type;
        }

        return $this;
    }

    public function removeType(QuestionType $type): self
    {
        $this->types->removeElement($type);

        return $this;
    }
}
