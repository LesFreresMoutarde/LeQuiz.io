<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


/**
 * CustomQuiz
 *
 * @ORM\Table(
 *     name="custom_quiz",
 *     indexes={
 *         @ORM\Index(name="custom_quiz_title", columns={"title"}),
 *         @ORM\Index(name="custom_quiz_author_id", columns={"authorId"}),
 *         @ORM\Index(name="custom_quiz_reviews_requested", columns={"reviewsRequested"}),
 *         @ORM\Index(name="custom_quiz_status", columns={"status"})})
 * @ORM\Entity(repositoryClass="App\Repository\CustomQuizRepository")
 */
class CustomQuiz
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="custom_quiz_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

   /* /**
     * @var string|null
     *
     * @ORM\Column(name="authorId", type="guid", nullable=true)
     */
  //  private $authorid;

    /**
     * @var bool
     *
     * @ORM\Column(name="reviewsRequested", type="boolean", nullable=false)
     */
    private $reviewsRequested;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=30, nullable=false)
     */
    private $status;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz", nullable=false)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz", nullable=false)
     */
    private $updatedAt;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="customQuizzes")
     * @ORM\JoinColumn(name="authorId", referencedColumnName="id")
     */
    private $author;

    //private $"authorid";

    /**
     * @var Category[]
     *
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="customQuizzes")
     * @ORM\JoinTable(name="category_custom_quiz",
     *     joinColumns={@ORM\JoinColumn(name="customQuizId", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="categoryId", referencedColumnName="id")}
     *     )
     */
    private $categories;


    /**
     * @var Question[]
     *
     * @ORM\OneToMany(targetEntity="Question", mappedBy="customQuiz")
     *
     */
    private $questions;

    /**
     * @var UserReview[]
     *
     * @ORM\OneToMany(targetEntity="UserReview", mappedBy="customQuiz")
     */
    private $reviews;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->reviews = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getReviewsRequested(): ?bool
    {
        return $this->reviewsRequested;
    }

    public function setReviewsRequested(bool $reviewsRequested): self
    {
        $this->reviewsRequested = $reviewsRequested;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getAuthor(): ?User
    {
        return $this->author;
    }

    public function setAuthor(?User $author): self
    {
        $this->author = $author;

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

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setCustomQuiz($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getCustomQuiz() === $this) {
                $question->setCustomQuiz(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserReview[]
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(UserReview $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setCustomQuiz($this);
        }

        return $this;
    }

    public function removeReview(UserReview $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getCustomQuiz() === $this) {
                $review->setCustomQuiz(null);
            }
        }

        return $this;
    }


}
