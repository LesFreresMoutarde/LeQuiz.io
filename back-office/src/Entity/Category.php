<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinTable;
use Doctrine\ORM\Mapping\ManyToMany;

/**
 * Category
 *
 * @ORM\Table(
 *     name="category",
 *     indexes={@ORM\Index(name="category_name", columns={"name"})}
 *     )
 * @ORM\Entity(repositoryClass="App\Repository\CategoryRepository")
 */

class Category
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="category_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`createdAt`", type="datetimetz", nullable=false)
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="`updatedAt`", type="datetimetz", nullable=false)
     */
    private $updatedAt;

    /**
     * @var CustomQuiz[]
     *
     * @ManyToMany(targetEntity="CustomQuiz", mappedBy="categories")
     */
    private $customQuizzes;

    /**
    // * @var Collection|Question[]
     *
     * @ManyToMany(targetEntity="Question", mappedBy="categories")
     */
    private $questions;

    public function __construct() {
        $this->customQuizzes = new ArrayCollection();
        $this->questions = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    /**
     * @return Collection|CustomQuiz[]
     */
    public function getCustomQuizzes(): Collection
    {
        return $this->customQuizzes;
    }

    public function addCustomQuiz(CustomQuiz $customQuiz): self
    {
        if (!$this->customQuizzes->contains($customQuiz)) {
            $this->customQuizzes[] = $customQuiz;
            $customQuiz->addCategory($this);
        }

        return $this;
    }

    public function removeCustomQuiz(CustomQuiz $customQuiz): self
    {
        if ($this->customQuizzes->removeElement($customQuiz)) {
            $customQuiz->removeCategory($this);
        }

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
            $question->addCategory($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            $question->removeCategory($this);
        }

        return $this;
    }
}
